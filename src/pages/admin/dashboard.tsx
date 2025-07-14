import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3, 
  Settings,
  LogOut,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

interface ServiceRequest {
  id: string;
  type: string;
  applicantName: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  weddingDate?: string;
  groomName?: string;
  brideName?: string;
  documents: string[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for service requests
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: "001",
      type: "Pernikahan",
      applicantName: "Ahmad Budi",
      submissionDate: "2024-01-15",
      status: "pending",
      weddingDate: "2024-02-14",
      groomName: "Ahmad Budi",
      brideName: "Siti Aminah",
      documents: ["KTP", "KK", "Surat Nikah"]
    },
    {
      id: "002",
      type: "Rujuk",
      applicantName: "Hasan Ali",
      submissionDate: "2024-01-14",
      status: "approved",
      documents: ["KTP", "Surat Cerai"]
    },
    {
      id: "003",
      type: "Pernikahan",
      applicantName: "Muhammad Yusuf",
      submissionDate: "2024-01-13",
      status: "pending",
      weddingDate: "2024-03-20",
      groomName: "Muhammad Yusuf",
      brideName: "Fatimah",
      documents: ["KTP", "KK", "Surat Keterangan"]
    }
  ]);

useEffect(() => {
  const userType = localStorage.getItem('userType');
  if (userType !== 'admin') {
    navigate('/auth/login'); // atau ke '/' atau ke mana pun halaman loginmu
  }
}, [navigate]);


  const handleStatusUpdate = async (requestId: string, newStatus: 'approved' | 'rejected') => {
    setServiceRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus }
          : req
      )
    );

    toast({
      title: `Permohonan ${newStatus === 'approved' ? 'disetujui' : 'ditolak'}`,
      description: `Permohonan ID ${requestId} berhasil ${newStatus === 'approved' ? 'disetujui' : 'ditolak'}`,
      className: newStatus === 'approved' ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground",
    });

    // Here you would normally send this to your PHP backend
    // Example API call:
    // await fetch('/api/update-request-status', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ requestId, status: newStatus })
    // });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
  };

  const filteredRequests = serviceRequests.filter(req =>
    req.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-warning border-warning">Menunggu</Badge>;
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    totalRequests: serviceRequests.length,
    pendingRequests: serviceRequests.filter(req => req.status === 'pending').length,
    approvedRequests: serviceRequests.filter(req => req.status === 'approved').length,
    rejectedRequests: serviceRequests.filter(req => req.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Admin</h1>
              <p className="opacity-90">Sistem Manajemen KUA Portal</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-white/20 text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Permohonan</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalRequests}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Menunggu</p>
                  <p className="text-2xl font-bold text-warning">{stats.pendingRequests}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
                  <p className="text-2xl font-bold text-success">{stats.approvedRequests}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ditolak</p>
                  <p className="text-2xl font-bold text-destructive">{stats.rejectedRequests}</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Permohonan Layanan</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Daftar Permohonan</CardTitle>
                    <CardDescription>Kelola semua permohonan layanan KUA</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari permohonan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Jenis Layanan</TableHead>
                      <TableHead>Nama Pemohon</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono">{request.id}</TableCell>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell>{request.applicantName}</TableCell>
                        <TableCell>{request.submissionDate}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Detail Permohonan #{request.id}</DialogTitle>
                                  <DialogDescription>
                                    Informasi lengkap permohonan {request.type}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Jenis Layanan</Label>
                                      <p className="text-sm text-muted-foreground">{request.type}</p>
                                    </div>
                                    <div>
                                      <Label>Nama Pemohon</Label>
                                      <p className="text-sm text-muted-foreground">{request.applicantName}</p>
                                    </div>
                                  </div>
                                  {request.groomName && request.brideName && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Nama Calon Pengantin Pria</Label>
                                        <p className="text-sm text-muted-foreground">{request.groomName}</p>
                                      </div>
                                      <div>
                                        <Label>Nama Calon Pengantin Wanita</Label>
                                        <p className="text-sm text-muted-foreground">{request.brideName}</p>
                                      </div>
                                    </div>
                                  )}
                                  {request.weddingDate && (
                                    <div>
                                      <Label>Tanggal Pernikahan</Label>
                                      <p className="text-sm text-muted-foreground">{request.weddingDate}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label>Dokumen yang Dilampirkan</Label>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {request.documents.map((doc, index) => (
                                        <Badge key={index} variant="outline">{doc}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  {request.status === 'pending' && (
                                    <div className="flex gap-2">
                                      <Button 
                                        variant="destructive" 
                                        onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                      >
                                        Tolak
                                      </Button>
                                      <Button 
                                        variant="success" 
                                        onClick={() => handleStatusUpdate(request.id, 'approved')}
                                      >
                                        Setujui
                                      </Button>
                                    </div>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            {request.status === 'pending' && (
                              <>
                                <Button 
                                  variant="success" 
                                  size="sm"
                                  onClick={() => handleStatusUpdate(request.id, 'approved')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analitik & Laporan
                </CardTitle>
                <CardDescription>Statistik permohonan dan layanan KUA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Statistik Bulan Ini</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Permohonan Pernikahan</span>
                        <Badge>12</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Permohonan Rujuk</span>
                        <Badge>3</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Konseling Pra-Nikah</span>
                        <Badge>8</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Tingkat Persetujuan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Disetujui</span>
                        <Badge className="bg-success text-success-foreground">85%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Ditolak</span>
                        <Badge variant="destructive">10%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Pending</span>
                        <Badge variant="outline" className="text-warning border-warning">5%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Pengaturan Sistem
                </CardTitle>
                <CardDescription>Konfigurasi dan pengaturan sistem KUA Portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pengaturan Umum</h3>
                    <div className="space-y-2">
                      <Label htmlFor="kua-name">Nama KUA</Label>
                      <Input id="kua-name" defaultValue="KUA Kecamatan Contoh" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kua-address">Alamat</Label>
                      <Textarea id="kua-address" defaultValue="Jl. Contoh No. 123, Kota Contoh" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pengaturan Notifikasi</h3>
                    <div className="space-y-2">
                      <Label htmlFor="email-admin">Email Admin</Label>
                      <Input id="email-admin" type="email" defaultValue="admin@kua.go.id" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-admin">Nomor Telepon</Label>
                      <Input id="phone-admin" defaultValue="+62 21 1234567" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="gradient">Simpan Pengaturan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;