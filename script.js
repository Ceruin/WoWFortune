$(document).ready(function() {
    function replaceWithSynonyms(text) {
        return text.split(' ').map(word => synonyms[word] || word).join(' ');
    }

    function generateCopyPasta() {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const copyPasta = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const options = vocabulary[key];
            const choice = options[Math.floor(Math.random() * options.length)];
            return replaceWithSynonyms(choice); // Replace with synonyms for variety
        });
        return copyPasta;
    }

    $('#generate').click(function() {
        const copyPasta = generateCopyPasta();
        $('#fortune').html(copyPasta);
    });
});
