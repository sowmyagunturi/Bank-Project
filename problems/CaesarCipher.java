public class CaesarCipher {

    // Method to encode the message
    public static String encode(String message, int shift) {
        StringBuilder encoded = new StringBuilder();

        for (char ch : message.toCharArray()) {
            if (Character.isUpperCase(ch)) {
                char c = (char) (((ch - 'A' + shift) % 26) + 'A');
                encoded.append(c);
            } else if (Character.isLowerCase(ch)) {
                char c = (char) (((ch - 'a' + shift) % 26) + 'a');
                encoded.append(c);
            } else {
                encoded.append(ch); // non-alphabetic characters remain unchanged
            }
        }

        return encoded.toString();
    }

    // Method to decode the message
    public static String decode(String message, int shift) {
        return encode(message, 26 - (shift % 26)); // decoding is reverse of encoding
    }

    // Main method to test the functionality
    public static void main(String[] args) {
        String original = "Hello, World!";
        int shift = 3;

        String encoded = encode(original, shift);
        String decoded = decode(encoded, shift);

        System.out.println("Original: " + original);
        System.out.println("Encoded : " + encoded);
        System.out.println("Decoded : " + decoded);
    }
}
