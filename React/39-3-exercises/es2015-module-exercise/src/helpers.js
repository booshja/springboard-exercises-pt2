function choice(items) {
    const idx = Math.floor(Math.random() * items.length);
    return items[idx];
}

function remove(items, item) {
    if (items.indexOf(item) === -1) {
        return undefined;
    } else {
        const idx = items.indexOf(item);
        return [...items.slice(0, idx), ...items.slice(idx + 1)];
    }
}

export { choice, remove };
