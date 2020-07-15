const fs = require('fs');
const path = require('path');

const readDirSync = (dir, filter) => {
    const rs = [];
    const files = fs.readdirSync(dir);
    files.filter((filename, index) => filter(filename, index)).forEach((filename) => {
        const p = path.join(dir, filename);
        const info = fs.statSync(p);
        if (info.isDirectory()) {
            rs.push(...readDirSync(p, filter));
        } else {
            rs.push(p);
        }
    });
    return rs;
};

const treeToArray = (tree, childProp = 'children', rs = []) => {
    tree.forEach(item => {
        rs.push(item);
        if (Array.isArray(item[childProp])) {
            treeToArray(item[childProp].map((r => ({ ...r, path: `${item.path}/${r.path}` }))), childProp, rs);
        }
    });
    return rs;
};

exports.readDirSync = readDirSync;
exports.treeToArray = treeToArray;
