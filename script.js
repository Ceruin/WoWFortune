$(document).ready(function() {
    function replaceWithSynonyms(text) {
        return text.split(' ').map(word => synonyms[word] || word).join(' ');
    }

    function generateCopyPasta(userInput) {
        const words = userInput.split(/\s+/); // Tokenize user input
        let copyPasta = "";

        words.forEach(word => {
            // Find the closest word from predefined categories
            let closestWord = "";
            let minDistance = Infinity;

            Object.values(vocabulary).forEach(category => {
                category.forEach(item => {
                    const [wordInCategory, japaneseWord] = item.split(' ');
                    const distance = Math.abs(word.localeCompare(wordInCategory, 'en', { sensitivity: 'base' }));
                    if (distance < minDistance) {
                        closestWord = japaneseWord ? japaneseWord : wordInCategory;
                        minDistance = distance;
                    }
                });
            });

            copyPasta += closestWord + " ";
        });

        return copyPasta.trim();
    }

    $('#generate').click(function() {
        const userInput = $('#inputText').val();
        const copyPasta = generateCopyPasta(userInput);
        $('#fortune').html(copyPasta);
    });
});
