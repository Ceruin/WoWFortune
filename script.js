$(document).ready(function() {
    function replaceWithSynonyms(text) {
        return text.split(' ').map(word => synonyms[word] || word).join(' ');
    }

    function generateCopyPasta(userInput) {
        const words = userInput.split(/\s+/); // Tokenize user input
        let copyPasta = "";
        
        // Iterate through user input words
        words.forEach(word => {
            // Use user input if it matches a category
            if (vocabulary.hasOwnProperty(word)) {
                const options = vocabulary[word];
                const choice = options[Math.floor(Math.random() * options.length)];
                copyPasta += replaceWithSynonyms(choice) + " ";
            } else {
                // Otherwise, select a random word from the predefined categories
                const randomCategory = Object.values(vocabulary)[Math.floor(Math.random() * Object.keys(vocabulary).length)];
                const randomWord = randomCategory[Math.floor(Math.random() * randomCategory.length)];
                copyPasta += replaceWithSynonyms(randomWord) + " ";
            }
        });

        return copyPasta.trim();
    }

    $('#generate').click(function() {
        const userInput = $('#inputText').val();
        const copyPasta = generateCopyPasta(userInput);
        $('#fortune').html(copyPasta);
    });
});
