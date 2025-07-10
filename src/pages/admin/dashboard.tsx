import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Pengguna",
      value: "2,543",
      description: "+12% dari bulan lalu",
      icon: Users,
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Pendaftaran Aktif",
      value: "847",
      description: "+5% dari minggu lalu",
      icon: FileText,
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Jadwal Hari Ini",
      value: "23",
      description: "8 selesai, 15 menunggu",
      icon: Calendar,
      trend: "neutral",
      color: "text-orange-600"
    },
    {
      title: "Tingkat Kepuasan",
      value: "98.2%",
      description: "+2.1% dari bulan lalu",
      icon: TrendingUp,
      trend: "up",
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "registration",
      title: "Pendaftaran nikah baru",
      description: "Ahmad Rizki & Siti Nurhaliza",
      time: "2 menit yang lalu",
      status: "pending"
    },
    {
      id: 2,
      type: "schedule",
      title: "Jadwal konsultasi selesai",
      description: "Budi Santoso - Konsultasi pra nikah",
      time: "15 menit yang lalu",
      status: "completed"
    },
    {
      id: 3,
      type: "document",
      title: "Dokumen diverifikasi",
      description: "Akta nikah - REG001234",
      time: "1 jam yang lalu",
      status: "verified"
    },
    {
      id: 4,
      type: "user",
      title: "Pengguna baru terdaftar",
      description: "Andi Wijaya - Warga Kec. Tanah Abang",
      time: "2 jam yang lalu",
      status: "new"
    }
  ];

  const quickActions = [
    { title: "Tambah Jadwal", description: "Buat jadwal konsultasi baru", action: "schedule" },
    { title: "Verifikasi Dokumen", description: "Review dokumen pending", action: "verify" },
    { title: "Buat Laporan", description: "Generate laporan bulanan", action: "report" },
    { title: "Kelola Pengguna", description: "Tambah atau edit pengguna", action: "users" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="text-orange-600 bg-orange-50">Menunggu</Badge>;
      case "completed":
        return <Badge variant="secondary" className="text-green-600 bg-green-50">Selesai</Badge>;
      case "verified":
        return <Badge variant="secondary" className="text-blue-600 bg-blue-50">Terverifikasi</Badge>;
      case "new":
        return <Badge variant="secondary" className="text-purple-600 bg-purple-50">Baru</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "schedule":
        return <Calendar className="h-4 w-4 text-green-600" />;
      case "document":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case "user":
        return <Users className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Selamat Datang, Admin!</h1>
        <p className="text-white/90">
          Kelola sistem informasi KUA dengan mudah dan efisien. Pantau aktivitas terbaru dan statistik penting di dashboard ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Aktivitas Terbaru
              </CardTitle>
              <CardDescription>
                Pantau aktivitas sistem dalam waktu nyata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Aksi Cepat</CardTitle>
              <CardDescription>
                Akses fitur utama dengan sekali klik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 hover:bg-primary/5 hover:border-primary/30"
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="text-primary">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Normal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Service</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-600">Scheduled</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}