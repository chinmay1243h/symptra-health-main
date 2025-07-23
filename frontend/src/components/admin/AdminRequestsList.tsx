
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  CheckIcon, 
  XIcon,
  ClockIcon,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

type Request = {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
};

const AdminRequestsList = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // In a real app, this would be an API call
        const mockRequests: Request[] = [
          { 
            id: '1', 
            type: 'Account Deletion', 
            description: 'User has requested their account to be deleted',
            status: 'pending',
            submittedBy: 'user123@example.com',
            submittedAt: new Date().toISOString()
          },
          { 
            id: '2', 
            type: 'Medical Record Access', 
            description: 'Request for access to patient records #12345',
            status: 'pending',
            submittedBy: 'doctor@hospital.org',
            submittedAt: new Date(Date.now() - 86400000).toISOString()
          },
          { 
            id: '3', 
            type: 'Payment Refund', 
            description: 'Customer requesting refund for service not rendered',
            status: 'approved',
            submittedBy: 'customer@example.com',
            submittedAt: new Date(Date.now() - 172800000).toISOString()
          },
          { 
            id: '4', 
            type: 'Support Ticket', 
            description: 'Unable to access premium features after payment',
            status: 'rejected',
            submittedBy: 'premium@user.com',
            submittedAt: new Date(Date.now() - 259200000).toISOString()
          },
        ];
        
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApproveRequest = (id: string) => {
    // In a real app, this would be an API call
    setRequests(requests.map(request => 
      request.id === id ? {...request, status: 'approved'} : request
    ));
    toast.success('Request approved');
  };

  const handleRejectRequest = (id: string) => {
    // In a real app, this would be an API call
    setRequests(requests.map(request => 
      request.id === id ? {...request, status: 'rejected'} : request
    ));
    toast.success('Request rejected');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-healthcare-primary" />
      </div>
    );
  }

  const pendingRequests = requests.filter(request => request.status === 'pending');

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Request Management</h2>
        <p className="text-sm text-gray-600">
          Process and manage user requests 
          {pendingRequests.length > 0 && (
            <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              {pendingRequests.length} pending
            </span>
          )}
        </p>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.type}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{request.description}</div>
                  </TableCell>
                  <TableCell>{request.submittedBy}</TableCell>
                  <TableCell>{formatDate(request.submittedAt)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    {request.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleApproveRequest(request.id)}
                          title="Approve"
                        >
                          <CheckIcon className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRejectRequest(request.id)}
                          title="Reject"
                        >
                          <XIcon className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Processed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRequestsList;
