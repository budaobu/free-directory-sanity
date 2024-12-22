const fs = require('fs');

const filePath = 'sanity.types.ts';
// const searchString = 'Array<{\n    _type: "localizedString";\n    en?: string;\n    zh?: string;\n  }> | null;';
// const searchString = 'Array<{\n\\s*_type:\\s*"localizedString";\n\\s*en?:\\s*string;\n\\s*zh?:\\s*string;\n\\s*}>\\s*\\|\\s*null;';
const searchString = /Array<\{[^{}]*_type:\s*"localizedString";[^{}]*\}>\s*\|\s*null;/g;
const replacementString = 'string;';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // const updatedData = data.replaceAll(searchString, replacementString);

    // const regex = new RegExp(searchString, 'g');
    // const updatedData = data.replace(regex, replacementString);

    const regex = new RegExp(searchString, 'g');
    let replacementCount = 0;

    const updatedData = data.replace(regex, (match) => {
        replacementCount++;
        return replacementString;
    });
    console.log('Replacement count:', replacementCount);

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Replacement done successfully!');
    });
});
