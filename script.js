$(document).ready(function() {
    // Load Google Translate API
    google.load("elements", "1", {
        packages: "translate"
    });

    function translate(text, targetLanguage) {
        return new Promise((resolve, reject) => {
            google.elements.transliterate.translate(text, 'en', targetLanguage, function(result) {
                if (result.error) {
                    reject(result.error);
                } else {
                    resolve(result.translation);
                }
            });
        });
    }

    async function fetchTranslations(words) {
        const translations = {};
        for (const word of words) {
            try {
                const [englishTranslation, japaneseTranslation] = await Promise.all([
                    translate(word, 'en'),
                    translate(word, 'ja')
                ]);
                translations[word] = { english: englishTranslation, japanese: japaneseTranslation };
            } catch (error) {
                console.error(`Error translating '${word}':`, error);
            }
        }
        return translations;
    }

    function generateCopyPasta(userInput, translations) {
        const words = userInput.split(/\s+/); // Tokenize user input
        let copyPasta = "";

        // Iterate through user input words
        words.forEach(word => {
            if (translations.hasOwnProperty(word)) {
                const { english, japanese } = translations[word];
                copyPasta += `${english} ${japanese} `;
            } else {
                // If translation not found, use original word
                copyPasta += `${word} ${word} `;
            }
        });

        return copyPasta.trim();
    }

    $('#generate').click(async function() {
        const userInput = $('#inputText').val();
        const words = userInput.split(/\s+/);
        const translations = await fetchTranslations(words);
        const copyPasta = generateCopyPasta(userInput, translations);
        $('#fortune').html(copyPasta);
    });
});
