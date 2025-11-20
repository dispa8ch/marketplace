'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminLogisticsPage() {
  const [partners] = useState([
    {
      id: '1',
      name: 'FastRider Logistics',
      code: 'FSTR',
      coverage: ['Ikeja', 'Surulere', 'Lagos Island', 'Yaba'],
      withinLGA: 1500,
      toIsland: 2500,
      outskirts: 3500,
      status: 'active',
    },
    {
      id: '2',
      name: 'QuickMove Express',
      code: 'QMEX',
      coverage: ['Ikeja', 'Alimosho', 'Agege', 'Ifako-Ijaiye'],
      withinLGA: 1200,
      toIsland: 2800,
      outskirts: 3800,
      status: 'active',
    },
    {
      id: '3',
      name: 'Island Express Delivery',
      code: 'IEXP',
      coverage: ['Lagos Island', 'Eti-Osa', 'Lekki'],
      withinLGA: 1800,
      toIsland: 2000,
      outskirts: 4500,
      status: 'inactive',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Logistics Partners</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Within LGA</TableHead>
                <TableHead>To Island</TableHead>
                <TableHead>Outskirts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.code}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.coverage.slice(0, 3).map((lga) => (
                        <Badge key={lga} variant="secondary" className="text-xs">
                          {lga}
                        </Badge>
                      ))}
                      {partner.coverage.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{partner.coverage.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₦{partner.withinLGA.toLocaleString()}</TableCell>
                  <TableCell>₦{partner.toIsland.toLocaleString()}</TableCell>
                  <TableCell>₦{partner.outskirts.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={partner.status === 'active' ? 'default' : 'secondary'}
                    >
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        {partner.status === 'active' ? (
                          <ToggleRight className="h-4 w-4 text-primary" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
