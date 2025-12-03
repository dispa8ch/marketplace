"use client"

import { useState, useEffect } from "react"
import { DollarSign, TrendingUp, Download, CreditCard, Plus } from "lucide-react"
import Iconex from "@/components/icons/iconex"
import { StatsCard } from "@/components/vendor/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getWalletBalance, getBankAccounts, type Transaction } from "@/lib/api/vendor"
import { useToast } from "@/hooks/use-toast"
import { AddBankAccountModal } from "@/components/vendor/modals/add-bank-account-modal"

export default function VendorWalletPage() {
  const { toast } = useToast()
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [bankAccounts, setBankAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadData = async () => {
    try {
      const [walletData, accountsData] = await Promise.all([getWalletBalance(), getBankAccounts()])
      setBalance(walletData.balance)
      setTransactions(walletData.transactions)
      setBankAccounts(accountsData)
    } catch (error) {
      console.error("Failed to load wallet", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            <Iconex icon={Plus} className="mr-2 h-4 w-4"/>
            Add Bank Account
          </Button>
          <Button>
            <Iconex icon={Download} className="mr-2 h-4 w-4"/>
            Withdraw Funds
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Available Balance"
          value={`₦${balance.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Total Earnings"
          value={`₦${balance.toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
        <StatsCard title="Pending" value="₦0" icon={<CreditCard className="h-6 w-6 text-primary" />} />
      </div>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {bankAccounts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {bankAccounts.map((account) => (
                <div key={account.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">{account.bankName}</p>
                    <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                    <p className="text-xs text-muted-foreground">{account.accountName}</p>
                  </div>
                  {account.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No bank accounts added.</p>
          )}
        </CardContent>
      </Card>

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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{txn.id}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}
                    >
                      {txn.type === "credit" ? "+" : ""}₦{Math.abs(txn.amount).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddBankAccountModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
