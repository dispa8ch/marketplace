import { DollarSign, TrendingUp, Download, CreditCard } from 'lucide-react';
import { StatsCard } from '@/components/vendor/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VendorWalletPage() {
  const transactions = [
    {
      id: 'TXN-001',
      type: 'credit',
      description: 'Order payment - ORD-1001',
      amount: 60000,
      date: '2024-01-15',
    },
    {
      id: 'TXN-002',
      type: 'credit',
      description: 'Order payment - ORD-1002',
      amount: 35000,
      date: '2024-01-15',
    },
    {
      id: 'TXN-003',
      type: 'debit',
      description: 'Withdrawal to bank',
      amount: -50000,
      date: '2024-01-14',
    },
    {
      id: 'TXN-004',
      type: 'credit',
      description: 'Order payment - ORD-1003',
      amount: 25000,
      date: '2024-01-14',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Withdraw Funds
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Available Balance"
          value="₦450,000"
          icon={DollarSign}
        />
        <StatsCard title="Total Earnings" value="₦1,250,000" icon={TrendingUp} />
        <StatsCard title="Pending" value="₦75,000" icon={CreditCard} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {txn.type === 'credit' ? '+' : ''}
                    ₦{Math.abs(txn.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
