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
  const [permohonan, setPermohonan] = useState([]);

  // Mock data for service requests
 const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

useEffect(() => {
  const fetchPermohonan = async () => {
    try {
      const res = await fetch("http://localhost/kua-backend/admin/layanan.php");
      const data = await res.json();
      setPermohonan(data);
    } catch (error) {
      console.error("Gagal fetch data layanan", error);
    }
  };

  fetchPermohonan();
}, []);


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
      return <span className="badge-warning">Menunggu</span>;
    case 'approved':
      return <span className="badge-success">Disetujui</span>;
    case 'rejected':
      return <span className="badge-danger">Ditolak</span>;
    default:
      return <span className="bg-gray-300 text-black px-2 py-1 rounded-full text-xs">{status}</span>;
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
     <header className="bg-green-700 text-white shadow-md">
  <div className="container mx-auto px-4 py-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-sm opacity-90">Sistem Manajemen KUA</p>
      </div>
      <div className="flex items-center gap-4">
        <button 
          className="relative text-white hover:text-gray-200 transition"
          onClick={() => alert('Fitur notifikasi belum tersedia')}
        >
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
         {/* Tombol Keluar */}
        <Button 
          onClick={handleLogout}
          className="bg-white text-green-700 hover:bg-green-100 border border-white rounded-md px-4 py-2 flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  </div>
</header>x  

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
                                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded"
                                        onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                      >
                                        <XCircle className="h-4 w-4" />
                                     <Button
                                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-2 py-1 rounded"
                                      onClick={() => handleStatusUpdate(request.id, 'approved')}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
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
                <CardDescription>Konfigurasi dan pengaturan sistem KUA Benai</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pengaturan Umum</h3>
                    <div className="space-y-2">
                      <Label htmlFor="kua-name">Nama KUA</Label>
                      <Input id="kua-name" defaultValue="KUA Kecamatan Benai" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kua-address">Alamat</Label>
                      <Textarea id="kua-address" defaultValue="Jl. Jend. Sudirman Benai. Kua Benai" />
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