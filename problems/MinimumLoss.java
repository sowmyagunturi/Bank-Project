import java.util.*;

public class MinimumLoss {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        long[] prices = new long[n];
        Map<Long, Integer> yearMap = new HashMap<>();

        // Read input prices and store original indices
        for (int i = 0; i < n; i++) {
            prices[i] = scanner.nextLong();
            yearMap.put(prices[i], i); // price -> index
        }

        Arrays.sort(prices); // Sort prices

        long minLoss = Long.MAX_VALUE;

        // Iterate from higher to lower price to maintain loss
        for (int i = n - 1; i > 0; i--) {
            long higher = prices[i];
            long lower = prices[i - 1];
            int buyYear = yearMap.get(higher);
            int sellYear = yearMap.get(lower);

            // Ensure we are buying before selling
            if (buyYear < sellYear) {
                minLoss = Math.min(minLoss, higher - lower);
            }
        }

        System.out.println(minLoss == Long.MAX_VALUE ? -1 : minLoss);
        scanner.close();
    }
}
