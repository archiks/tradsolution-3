
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, ShoppingCart, FileText, Download, Settings, Search, Plus, Eye, DownloadCloud, RefreshCw, Key, Shield, Link as LinkIcon, Edit3, CreditCard, Pencil, X, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { MockBackend } from '../services/mockBackend';
import { Order, Invoice, AccessLog, AdminStats, OrderStatus, DownloadLink, PayPalSettings, InvoiceAuditTrail } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { COUNTRIES, PRODUCTS } from '../constants';

type View = 'DASHBOARD' | 'ORDERS' | 'INVOICES' | 'LOGS' | 'SETTINGS';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');

  return (
    <div className="flex h-screen bg-dark-900 text-white overflow-hidden font-sans selection:bg-gold-500 selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-dark-800 flex flex-col">
        <div className="p-6 border-b border-white/10">
           <h1 className="font-serif text-xl text-white">TradSolution<span className="text-gold-500">.</span></h1>
           <span className="text-xs text-gray-500 uppercase tracking-widest">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'DASHBOARD'} onClick={() => setCurrentView('DASHBOARD')} />
          <SidebarItem icon={ShoppingCart} label="Orders" active={currentView === 'ORDERS'} onClick={() => setCurrentView('ORDERS')} />
          <SidebarItem icon={FileText} label="Invoices" active={currentView === 'INVOICES'} onClick={() => setCurrentView('INVOICES')} />
          <SidebarItem icon={Download} label="Downloads" active={currentView === 'LOGS'} onClick={() => setCurrentView('LOGS')} />
          <SidebarItem icon={Settings} label="Settings" active={currentView === 'SETTINGS'} onClick={() => setCurrentView('SETTINGS')} />
        </nav>

        <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center font-bold text-xs">AD</div>
                <div>
                    <p className="text-sm font-medium">Administrator</p>
                    <p className="text-xs text-gray-500">admin@tradsolution.com</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-dark-900 relative">
         <div className="p-8 max-w-7xl mx-auto min-h-full">
             {currentView === 'DASHBOARD' && <DashboardOverview />}
             {currentView === 'ORDERS' && <OrdersManager />}
             {currentView === 'INVOICES' && <InvoicesManager />}
             {currentView === 'LOGS' && <DownloadsManager />}
             {currentView === 'SETTINGS' && <SettingsView />}
         </div>
      </main>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: any, label: string, active: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20 shadow-[0_0_15px_-5px_rgba(224,194,112,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
    </button>
);

// --- Sub-Views ---

const DashboardOverview: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);

    useEffect(() => {
        MockBackend.getStats().then(setStats);
    }, []);

    if (!stats) return <div className="text-gray-500">Loading stats...</div>;

    const chartData = [
        { name: 'Mon', val: 400 }, { name: 'Tue', val: 300 }, { name: 'Wed', val: 600 },
        { name: 'Thu', val: 800 }, { name: 'Fri', val: 500 }, { name: 'Sat', val: 900 }, { name: 'Sun', val: 1000 }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-3xl font-serif text-white mb-2">Dashboard</h2>
                <p className="text-gray-500">Welcome back. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Revenue" value={`€${stats.totalRevenue.toLocaleString()}`} trend="+12%" />
                <StatCard label="Total Orders" value={stats.totalOrders.toString()} trend="+5%" />
                <StatCard label="Active Users" value={stats.activeUsers.toString()} trend="+24%" />
                <StatCard label="Conversion Rate" value={`${stats.conversionRate}%`} trend="+0.4%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-lg font-medium text-white">Revenue Overview</h3>
                         <select className="bg-black/20 border border-white/10 rounded-lg text-xs text-gray-400 px-2 py-1">
                             <option>Last 7 Days</option>
                             <option>This Month</option>
                         </select>
                    </div>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={chartData}>
                                 <XAxis dataKey="name" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                                 <YAxis stroke="#333" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                                 <Tooltip 
                                    contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#E0C270' }}
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                 />
                                 <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                     {chartData.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={index === 6 ? '#E0C270' : '#333'} />
                                     ))}
                                 </Bar>
                             </BarChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ label: string, value: string, trend: string }> = ({ label, value, trend }) => (
    <div className="bg-dark-800 p-6 rounded-2xl border border-white/5 hover:border-gold-500/20 transition-all shadow-lg hover:shadow-gold-500/5">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{label}</p>
        <div className="flex justify-between items-end">
            <h3 className="text-2xl font-medium text-white">{value}</h3>
            <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full border border-green-500/20">{trend}</span>
        </div>
    </div>
);

const OrdersManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const refresh = () => {
        setLoading(true);
        MockBackend.getOrders().then((data) => {
            setOrders(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-white">Orders</h2>
                <div className="flex gap-2">
                     <button onClick={refresh} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 border border-white/5"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
                     <button 
                        onClick={() => setIsCreatingOrder(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-black rounded-lg text-sm font-medium hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
                     >
                         <Plus className="w-4 h-4" /> Manual Order
                     </button>
                </div>
             </div>

             <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                 <table className="w-full text-sm text-left">
                     <thead className="text-xs text-gray-500 uppercase bg-black/20 border-b border-white/5">
                         <tr>
                             <th className="px-6 py-4">ID</th>
                             <th className="px-6 py-4">Customer</th>
                             <th className="px-6 py-4">Product</th>
                             <th className="px-6 py-4">Amount</th>
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4 text-right">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                         {orders.map((order) => (
                             <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                 <td className="px-6 py-4 font-mono text-gray-500 text-xs">{order.id}</td>
                                 <td className="px-6 py-4">
                                     <div className="text-white font-medium">{order.customerName}</div>
                                     <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                 </td>
                                 <td className="px-6 py-4 text-gray-300">{order.productName}</td>
                                 <td className="px-6 py-4 text-white">€{order.amount}</td>
                                 <td className="px-6 py-4">
                                     <StatusBadge status={order.status} />
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                     <button 
                                        onClick={() => setEditingOrder(order)}
                                        className="p-2 hover:bg-gold-500 hover:text-black rounded-lg text-gray-400 transition-colors"
                                        title="Edit Invoice"
                                     >
                                         <Pencil className="w-4 h-4" />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>

             {editingOrder && (
                 <EditInvoiceModal 
                    order={editingOrder} 
                    onClose={() => setEditingOrder(null)} 
                    onSave={() => { setEditingOrder(null); refresh(); }} 
                 />
             )}

             {isCreatingOrder && (
                 <CreateOrderModal 
                    onClose={() => setIsCreatingOrder(false)}
                    onSave={() => { setIsCreatingOrder(false); refresh(); }}
                 />
             )}
        </div>
    );
};

const CreateOrderModal: React.FC<{ onClose: () => void, onSave: () => void }> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productId, setProductId] = useState(PRODUCTS[0].id);
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.COMPLETED);
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('Germany');
    // Default to current date and time
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name || !email) {
            alert("Name and Email are required");
            return;
        }
        setLoading(true);
        try {
            // Combine Date and Time into ISO Strings
            const dateTimeStr = `${date}T${time}:00`;
            const isoDateTime = new Date(dateTimeStr).toISOString();

            await MockBackend.createOrder(
                productId, 
                name, 
                email, 
                'MANUAL', 
                status,
                address,
                country,
                isoDateTime, // Created At
                isoDateTime  // Access Time
            );
            onSave();
        } catch (e) {
            alert("Failed to create order");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh]">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-lg font-serif text-white">New Manual Order</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                         <div className="col-span-2">
                             <Input label="Customer Name" value={name} onChange={setName} required />
                         </div>
                         <div className="col-span-2">
                             <Input label="Customer Email" value={email} onChange={setEmail} type="email" required />
                         </div>
                         <div className="col-span-2">
                             <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Address</label>
                             <textarea 
                                 value={address} 
                                 onChange={(e) => setAddress(e.target.value)}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50 min-h-[60px]"
                             />
                         </div>
                         <div className="col-span-1">
                             <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Country</label>
                             <select 
                                 value={country}
                                 onChange={(e) => setCountry(e.target.value)}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50"
                             >
                                 {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                         </div>
                         <div className="col-span-1">
                            {/* Spacer or additional field */}
                         </div>
                    </div>
                    
                    <div className="h-px bg-white/5 my-4"></div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Product</label>
                             <select 
                                 value={productId}
                                 onChange={(e) => setProductId(e.target.value)}
                                 className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50"
                             >
                                 {PRODUCTS.map(p => (
                                     <option key={p.id} value={p.id}>{p.name} (€{p.price})</option>
                                 ))}
                             </select>
                        </div>
                         <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Status</label>
                            <select 
                                value={status}
                                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50"
                            >
                                <option value={OrderStatus.PENDING}>PENDING</option>
                                <option value={OrderStatus.COMPLETED}>COMPLETED</option>
                                <option value={OrderStatus.DOWNLOADED}>DOWNLOADED (Simulated)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Order Date</label>
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Access Time</label>
                            <input 
                                type="time" 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50" 
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-white/10 bg-[#1c1c1e] flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-colors">Cancel</button>
                    <button 
                        onClick={handleCreate}
                        disabled={loading}
                        className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-black font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditInvoiceModal: React.FC<{ order: Order, onClose: () => void, onSave: () => void }> = ({ order, onClose, onSave }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [auditData, setAuditData] = useState<InvoiceAuditTrail | null>(null);

    // Initial Load
    useEffect(() => {
        MockBackend.getInvoiceByOrderId(order.id).then(async (data) => {
            setInvoice(data);
            // Pre-fetch simulated audit data for display
            try {
                const pdfData = await MockBackend.generateInvoicePdfData(data.id);
                if (pdfData.auditTrail) setAuditData(pdfData.auditTrail);
            } catch(e) { /* ignore if new invoice */ }
            setLoading(false);
        });
    }, [order.id]);

    // Totals Recalculation
    useEffect(() => {
        if (invoice) {
            setInvoice(prev => prev ? ({ ...prev, total: prev.subtotal + prev.tax }) : null);
        }
    }, [invoice?.subtotal, invoice?.tax]);

    // Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [invoice]);

    const handleSave = async () => {
        if (!invoice) return;
        setIsSaving(true);
        setError(null);
        
        // Basic Validation
        if (!invoice.billTo.name || !invoice.billTo.email || !invoice.invoiceNumber) {
            setError("Missing required fields.");
            setIsSaving(false);
            return;
        }

        try {
            await MockBackend.updateInvoice(invoice);
            onSave();
        } catch (err: any) {
            setError(err.message || "Failed to save.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!invoice) return;
        
        try {
            // Generate valid PDF Blob
            const pdfBlob = await MockBackend.generateInvoicePDFBlob(invoice.id);
            
            // Create download link
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${invoice.invoiceNumber}.pdf`; // Correct extension
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e: any) {
            setError("Failed to generate PDF: " + e.message);
        }
    };

    if (loading || !invoice) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h3 className="text-lg font-serif text-white">Edit Invoice</h3>
                        <div className="h-0.5 w-12 bg-gold-500 mt-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            invoice.status === 'ISSUED' || invoice.status === 'PAID' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                            invoice.status === 'VOIDED' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                            'bg-gray-500/10 border-gray-500/20 text-gray-500'
                        }`}>
                            {invoice.status}
                        </span>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                    
                    {/* Section: Billing */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-gold-500 font-medium">Billing Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Bill-To Name" value={invoice.billTo.name} onChange={(v) => setInvoice({...invoice, billTo: {...invoice.billTo, name: v}})} required />
                            <Input label="Bill-To Email" type="email" value={invoice.billTo.email} onChange={(v) => setInvoice({...invoice, billTo: {...invoice.billTo, email: v}})} required />
                            <div className="col-span-2">
                                <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Address</label>
                                <textarea 
                                    value={invoice.billTo.address || ''} 
                                    onChange={(e) => setInvoice({...invoice, billTo: {...invoice.billTo, address: e.target.value}})}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50 min-h-[80px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Country</label>
                                <select 
                                    value={invoice.billTo.country || ''}
                                    onChange={(e) => setInvoice({...invoice, billTo: {...invoice.billTo, country: e.target.value}})}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50"
                                >
                                    <option value="">Select Country...</option>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section: Meta */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <h4 className="text-xs uppercase tracking-widest text-gold-500 font-medium">Invoice Meta</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Invoice #" value={invoice.invoiceNumber} onChange={(v) => setInvoice({...invoice, invoiceNumber: v})} required />
                            <Input label="Order #" value={order.id} disabled />
                            <Input label="Issue Date (UTC)" type="date" value={new Date(invoice.issueDate).toISOString().split('T')[0]} onChange={(v) => setInvoice({...invoice, issueDate: new Date(v).toISOString()})} />
                        </div>
                    </div>

                    {/* Section: Amounts */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <h4 className="text-xs uppercase tracking-widest text-gold-500 font-medium">Amounts & Currency</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Subtotal (€)" type="number" value={invoice.subtotal} onChange={(v) => setInvoice({...invoice, subtotal: parseFloat(v)})} />
                            <Input label="Tax (€)" type="number" value={invoice.tax} onChange={(v) => setInvoice({...invoice, tax: parseFloat(v)})} />
                            <Input label="Total (€)" type="number" value={invoice.total} disabled />
                        </div>
                    </div>

                    {/* Section: Audit Preview */}
                    <div className="pt-4 border-t border-white/5">
                        <div className="bg-white/[0.03] rounded-lg border border-white/10 p-4">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                                <span>Digital Delivery Confirmation (Audit Trail)</span>
                                {auditData?.isSandbox && <span className="text-[9px] bg-yellow-500/20 text-yellow-500 px-1 rounded">SANDBOX</span>}
                            </h5>
                            <div className="grid grid-cols-2 gap-y-2 text-xs font-mono">
                                <div className="text-gray-500">Delivery Status:</div>
                                <div className={auditData?.deliveryStatus === 'DOWNLOADED' ? 'text-green-400' : 'text-gray-400'}>{auditData?.deliveryStatus || 'PENDING'}</div>
                                
                                <div className="text-gray-500">Link ID:</div>
                                <div className="text-gray-300">{auditData?.linkId || '—'}</div>
                                
                                <div className="text-gray-500">Access IP:</div>
                                <div className="text-gray-300">{auditData?.accessIp || '—'}</div>
                                
                                <div className="text-gray-500">Timestamp (UTC):</div>
                                <div className="text-gray-300">{auditData?.accessTime ? new Date(auditData.accessTime).toLocaleString() : '—'}</div>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-600 mt-2 text-center">This data will be embedded permanently in the generated PDF.</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-[#1c1c1e] flex justify-between items-center">
                    <button 
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 text-sm transition-colors"
                    >
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-gold-500 hover:bg-gold-400 text-black font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                        {!isSaving && <Save className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Input for Modal
const Input: React.FC<{ label: string, value: any, onChange?: (v: string) => void, type?: string, required?: boolean, disabled?: boolean }> = ({ label, value, onChange, type = "text", required, disabled }) => (
    <div>
        <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">
            {label} {required && <span className="text-gold-500">*</span>}
        </label>
        <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
    </div>
);

const StatusBadge: React.FC<{status: OrderStatus}> = ({status}) => {
    const colors = {
        [OrderStatus.COMPLETED]: 'bg-green-500/10 text-green-400 border-green-500/20',
        [OrderStatus.PENDING]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        [OrderStatus.FAILED]: 'bg-red-500/10 text-red-400 border-red-500/20',
        [OrderStatus.REFUNDED]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        [OrderStatus.DOWNLOADED]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
            {status}
        </span>
    );
};

const InvoicesManager: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        MockBackend.getInvoices().then(setInvoices);
    }, []);

    const handleDownload = async (invoice: Invoice) => {
        try {
            const pdfBlob = await MockBackend.generateInvoicePDFBlob(invoice.id);
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${invoice.invoiceNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e: any) {
            alert("Error: " + e.message);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-serif text-white">Invoices</h2>
            <div className="grid gap-4">
                {invoices.map((inv) => (
                    <div key={inv.id} className="bg-dark-800 p-6 rounded-xl border border-white/5 flex justify-between items-center hover:border-gold-500/30 transition-all shadow-lg hover:shadow-gold-500/5 group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-gray-400 group-hover:text-gold-400 transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">{inv.invoiceNumber}</h4>
                                <p className="text-sm text-gray-500">Issued: {new Date(inv.issueDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-white font-medium">€{inv.total.toFixed(2)}</p>
                                <p className="text-xs text-gray-500">{inv.billTo.name}</p>
                            </div>
                            <button 
                                onClick={() => handleDownload(inv)}
                                className="p-2 bg-white/5 hover:bg-gold-500 hover:text-black rounded-lg text-gray-400 transition-colors" title="Download PDF"
                            >
                                <DownloadCloud className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DownloadsManager: React.FC = () => {
    const [links, setLinks] = useState<DownloadLink[]>([]);
    const [logs, setLogs] = useState<AccessLog[]>([]);

    useEffect(() => {
        MockBackend.getDownloadLinks().then(setLinks);
        MockBackend.getLogs().then(setLogs);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in">
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-serif text-white">Active Download Links</h2>
                    <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-md border border-white/5">Export CSV</button>
                </div>
                <div className="bg-dark-800 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-black/20 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Key</th>
                                <th className="px-6 py-3">Downloads</th>
                                <th className="px-6 py-3">Expires</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {links.map((link) => (
                                <tr key={link.id} className="hover:bg-white/[0.02]">
                                    <td className="px-6 py-3 text-white">{link.productName}</td>
                                    <td className="px-6 py-3 font-mono text-xs text-gold-500">{link.key}</td>
                                    <td className="px-6 py-3 text-gray-400">{link.downloadCount} / {link.maxDownloads}</td>
                                    <td className="px-6 py-3 text-gray-500 text-xs">{new Date(link.expiresAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] ${link.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {link.isActive ? 'ACTIVE' : 'REVOKED'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-serif text-white mb-4">Recent Access Logs</h2>
                <div className="bg-dark-800 rounded-xl border border-white/5 p-4 font-mono text-sm space-y-2 max-h-[400px] overflow-y-auto">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-4 text-xs border-b border-white/5 pb-2 mb-2 last:border-0 hover:bg-white/5 p-1 rounded transition-colors">
                            <span className="text-gold-500 w-32 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span className="text-blue-400 w-32 shrink-0">{log.ip}</span>
                            <span className="text-gray-300 flex-1">{log.resource}</span>
                            <span className="text-gray-500 truncate w-48 hidden md:block">{log.deviceSig}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const SettingsView: React.FC = () => {
    const [ppSettings, setPPSettings] = useState<PayPalSettings | null>(null);

    useEffect(() => {
        MockBackend.getPayPalSettings().then(setPPSettings);
    }, []);

    const updatePP = (key: keyof PayPalSettings, val: any) => {
        if(!ppSettings) return;
        setPPSettings({...ppSettings, [key]: val});
    };

    if(!ppSettings) return <div>Loading...</div>;

    return (
        <div className="space-y-8 animate-in fade-in max-w-3xl">
            <h2 className="text-2xl font-serif text-white">System Settings</h2>
            
            <section className="bg-dark-800 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-medium text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gold-500" /> Company Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SettingsInput label="Company Name" defaultValue="TradSolution Ltd." />
                    <SettingsInput label="VAT Number" defaultValue="44103115853" />
                    <SettingsInput label="Address" defaultValue="Purva iela 3, Valmiera, LV-4201" className="col-span-2" />
                    <SettingsInput label="Invoice Prefix" defaultValue="TS-" />
                </div>
            </section>

            <section className="bg-dark-800 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CreditCard className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                     PayPal Integration
                </h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                        <div>
                            <p className="text-white font-medium">Enable PayPal Checkout</p>
                            <p className="text-xs text-gray-500">Allow customers to pay via PayPal REST API</p>
                        </div>
                        <Toggle checked={ppSettings.enabled} onChange={(v) => updatePP('enabled', v)} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                             <label className="block text-xs font-medium text-gray-500 mb-2">Environment Mode</label>
                             <div className="flex bg-dark-700 rounded-lg p-1 w-fit border border-white/10">
                                 <button 
                                    onClick={() => updatePP('mode', 'SANDBOX')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${ppSettings.mode === 'SANDBOX' ? 'bg-gold-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
                                 >
                                     Sandbox
                                 </button>
                                 <button 
                                    onClick={() => updatePP('mode', 'LIVE')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${ppSettings.mode === 'LIVE' ? 'bg-red-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                                 >
                                     Live
                                 </button>
                             </div>
                        </div>
                        <SettingsInput 
                            label="Client ID" 
                            defaultValue={ppSettings.clientId} 
                            onChange={(e) => updatePP('clientId', e.target.value)}
                        />
                        <SettingsInput 
                            label="Client Secret" 
                            type="password"
                            defaultValue={ppSettings.clientSecret} 
                            onChange={(e) => updatePP('clientSecret', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="pt-4 flex justify-end">
                <button className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/10">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const SettingsInput: React.FC<{ label: string, defaultValue?: string, className?: string, type?: string, onChange?: (e: any) => void }> = ({ label, defaultValue, className, type = "text", onChange }) => (
    <div className={className}>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
        <input 
            type={type} 
            defaultValue={defaultValue} 
            onChange={onChange}
            className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all text-sm"
        />
    </div>
);

const Toggle: React.FC<{ checked: boolean, onChange: (val: boolean) => void }> = ({ checked, onChange }) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-gold-500' : 'bg-gray-700'}`}
    >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
    </button>
);
