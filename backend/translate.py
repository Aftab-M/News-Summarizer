from googletrans import Translator

def translate_text(text, dest_language):
    try:
        # Create a translator object
        translator = Translator()

        # Translate text from one language to another
        translated_text = translator.translate(text, dest=dest_language)

        # Return translated text
        return translated_text.text
    except Exception as e:
        print("An error occurred:", e)
        return None

# Example usage
translated_text = translate_text('Hello, how are you?', 'fr')
if translated_text:
    print("Translated text:", translated_text)
else:
    print("Translation failed or an error occurred.")
