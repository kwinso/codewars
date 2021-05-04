type TokenType = "SYM" | "LBRACE" | "RBRACE" | "NUMBER";
type TopLevelBrace = { formula: string, end: number };
type AtomsAmount = { [key: string]: number };

const DigitRegExp = new RegExp(/\d/);

interface Token {
    type: TokenType,
    value: string
}

// Lexes a formula into tokens
function tokenize(formula: string): Token[] {
    const tokens: Token[] = [];
    let formulaChars = formula.split("");

    for (let i = 0; i < formulaChars.length; i++) {
        let value = formulaChars[i];
        let type: TokenType;

        // Character values are recognized as element symbol
        if (new RegExp(/[A-Za-z]/).test(value)) {
            type = "SYM";

            // Check if next char exists and it's lowercase, basically the part of the current symbol
            /* 
                NOTE: This is because most of the symbols in peridotic table is signle character
                or uppercase char followed by lowercase one e.g. Mg, Na, Fe
            */
            let nextChar = formulaChars[i + 1];

            if (nextChar && new RegExp(/[a-z]/).test(nextChar)) {
                value += nextChar;
                i++;
            }

        }
        else if (DigitRegExp.test(value)) {
            type = "NUMBER";
            // Concat following digits into single one
            /*
                1,2,3 -> 123 instead of signle token for every digit
            */
            for (let v of formulaChars.slice(i + 1)) {
                if (DigitRegExp.test(v)) {
                    value += v;
                    i++;
                    continue;
                }
                break;
            }
        }
        // Defining opening and closing braces
        else if (new RegExp(/(\[|\(|\{)/).test(value)) type = "LBRACE";
        else if (new RegExp(/(\)|\]|\})/).test(value)) type = "RBRACE";

        tokens.push({ type, value });
    }

    return tokens;
}

/* 
    Finds and returns a top level brace contents from string
    Mg(OH)2 will return OH

    Also this func returns index where closing brace was occured for that brace
*/
function getTopLevelBrace(tokens: Token[]): TopLevelBrace {
    let group: TopLevelBrace = { end: 0, formula: "" };
    let start;
    // For keeping track of how many braced opened in the moment
    let openedBraces = 0;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type == "LBRACE") {
            // First opened brace defines start of the top-level-brace
            if (openedBraces == 0) start = i;

            openedBraces++;
        } else if (token.type == "RBRACE") {
            openedBraces--;

            // Last closed brace defines end of the top-level brace
            if (openedBraces == 0) {
                group.end = i;
                break;
            }
        }
    }

    // Extracts formula from the brace
    group.formula = tokens.slice(start + 1, group.end).map(t => t.value).join("");
    return group;
}

export function parseMolecule(formula): AtomsAmount {
    let out: AtomsAmount = {};
    let tokens = tokenize(formula);

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        let nextToken = tokens[i + 1];

        switch (token.type) {
            case "SYM": {
                let amount = 1;
                // Next token becomes amount if it's number
                if (nextToken && nextToken.type == "NUMBER")
                    amount = parseInt(nextToken.value);

                // Append or create new element in dictionary
                if (out[token.value]) out[token.value] += amount;
                else out[token.value] = amount;

                break;
            }
            case "LBRACE": {
                let { formula: braceFormula, end } = getTopLevelBrace(tokens.slice(i));

                // Skip this brace because it's already processed
                i += end;
                // Recursevly get atoms amount in this brace
                let braceAtoms = parseMolecule(braceFormula);
                let nextToken = tokens[i + 1];
                // Amount for every atom in brace, defines how many times these brace repeated
                let braceAmount = 1;

                // If the next token is the symbol, we should process it in the next iteration
                if (nextToken?.type == "SYM") i--;
                // Otherwise, if it's number, set this as the amount
                if (nextToken?.type == "NUMBER")
                    braceAmount = parseInt(nextToken.value);

                for (let e in braceAtoms) {
                    // Set it as 0 if it's not registered yet
                    if (!out[e]) out[e] = 0;
                    // Add to global amount 
                    out[e] += braceAtoms[e] * braceAmount;
                }
                break;
            }
        }
    }

    return out;
}


// TESTS
let res;

res = parseMolecule("H2O");
console.log("H2O: ", res);

res = parseMolecule("(C5H5)Fe(CO)2CH3");
console.log("(C5H5)Fe(CO)2CH3: ", res);

res = parseMolecule("{[Co(NH3)4(OH)2]3Co}(SO4)3");
console.log("{[Co(NH3)4(OH)2]3Co}(SO4)3: ", res);