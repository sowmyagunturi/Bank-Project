
import java.util.Scanner;

public class IndianCurrencyFormat {
    
    // Method to format number in Indian currency style
    public static String formatIndianCurrency(double number) {
        String[] parts = String.valueOf(number).split("\\.");

        String integerPart = parts[0];
        String decimalPart = parts.length > 1 ? "." + parts[1] : "";

        StringBuilder result = new StringBuilder();

        int len = integerPart.length();

        // First group (last 3 digits)
        if (len > 3) {
            result.insert(0, integerPart.substring(len - 3));
            int remaining = len - 3;
            
            while (remaining > 2) {
                result.insert(0, "," + integerPart.substring(remaining - 2, remaining));
                remaining -= 2;
            }

            // If anything is left
            if (remaining > 0) {
                result.insert(0, integerPart.substring(0, remaining) + ",");
            }
        } else {
            result.append(integerPart);
        }

        return result.toString() + decimalPart;
    }

    // Main method to run the code
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number (float or double): ");
        double number = scanner.nextDouble();
        scanner.close();

        String formatted = formatIndianCurrency(number);
        System.out.println("Indian Currency Format: " + formatted);
    }
}

