import { storage } from "./server/storage";
import { simulateMultipleTransactions } from "./server/test-transaction";
import { getTokenomicsOverview } from "./server/tokenomics";

async function runTokenomicsTest() {
  try {
    // Create a test user if needed
    let testUser = await storage.getUserByUsername("test_user");
    if (!testUser) {
      testUser = await storage.createUser({
        username: "test_user",
        email: "test@example.com",
        password: "test123",
        role: "user"
      });
      console.log("Created test user:", testUser.username);
    }
    
    // Check initial tokenomics status
    const initialData = await getTokenomicsOverview();
    console.log("Initial tokenomics data:", initialData);
    
    // Simulate 5 ad payments and 10 votes
    console.log("Simulating transactions...");
    const result = await simulateMultipleTransactions(testUser.id, 5);
    
    // Check final tokenomics status
    const finalData = await getTokenomicsOverview();
    console.log("\nFinal tokenomics data:", finalData);
    console.log("\nTransaction Summary:");
    console.log(`- Ad Payments: ${result.adTransactions.length}`);
    console.log(`- Vote Transactions: ${result.voteTransactions.length}`);
    console.log(`- Total Founder Profit: ${result.totalProfit} BNB`);
    
    // Calculate the founder's 30% share
    const totalProcessed = 
      (result.adTransactions.length * 0.025) + 
      (result.voteTransactions.length * 0.005);
    
    console.log(`\nTotal BNB processed: ${totalProcessed.toFixed(6)}`);
    console.log(`Expected founder profit (30%): ${(totalProcessed * 0.3).toFixed(6)} BNB`);
    console.log(`Actual founder profit: ${result.totalProfit} BNB`);
    
    // Verify recipient wallet address
    console.log(`\nPlatform wallet address: ${finalData.platformWallet}`);
    console.log(`Matches requested address: ${finalData.platformWallet === "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330"}`);
    
  } catch (error) {
    console.error("Error running tokenomics test:", error);
  }
}

// Run the test
runTokenomicsTest().then(() => console.log("Test completed"));