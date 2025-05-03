import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function TokenomicsPage() {
  const { data: tokenomics, isLoading } = useQuery({
    queryKey: ["/api/tokenomics"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tokenomics) {
    return (
      <div className="container max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Tokenomics</h1>
        <p>Failed to load tokenomics data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-transparent bg-clip-text">
        Tokenomics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Fees Collected</CardTitle>
            <CardDescription>Total BNB collected in fees</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{parseFloat(tokenomics.totalFeesCollected).toFixed(4)} BNB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Founder Profit</CardTitle>
            <CardDescription>BNB allocated to founder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{parseFloat(tokenomics.founderProfit).toFixed(4)} BNB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Transaction Count</CardTitle>
            <CardDescription>Total number of processed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tokenomics.transactionCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit Distribution</CardTitle>
            <CardDescription>How project profits are distributed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tokenomics.distribution).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">{value}%</p>
                  </div>
                  <Progress value={value as number} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Breakdown</CardTitle>
            <CardDescription>Types of transactions processed</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Type</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ad Payments</TableCell>
                  <TableCell className="text-right">{tokenomics.transactionBreakdown.adPayments}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Votes</TableCell>
                  <TableCell className="text-right">{tokenomics.transactionBreakdown.votes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NFT Mintings</TableCell>
                  <TableCell className="text-right">{tokenomics.transactionBreakdown.nftMintings}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Wallet Address</CardTitle>
            <CardDescription>All platform profits are sent to this wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono bg-muted p-2 rounded break-all">
              {tokenomics.platformWallet}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date(tokenomics.lastUpdated).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}