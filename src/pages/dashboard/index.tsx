import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  AlertCircle,
  Receipt,
} from "lucide-react";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Badge variant="outline" className="font-normal">
              100
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Banner</p>
                    <p className="text-2xl font-bold">10</p>
                  </div>
                  <Receipt className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Promo</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Data Category</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <Badge variant="default">100 %</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Data Activity</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Data Transaksi</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Data Perlu Konfirmasi
                    </p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Data User</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Data Admin</p>
                    <p className="text-2xl font-bold">1000</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
