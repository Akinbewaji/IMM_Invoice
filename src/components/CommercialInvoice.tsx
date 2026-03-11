import { useState } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';
import logo from 'figma:asset/443b66aa536c3debe7eeeab8bf9420bebe7eda59.png';

interface InvoiceItem {
  id: string;
  partNum: string;
  description: string;
  commodityCode: string;
  qty: string;
  country: string;
  weight: string;
  unitPrice: string;
  totalAmount: string;
}

const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Get the current counter from localStorage
  let counter = parseInt(localStorage.getItem('invoiceCounter') || '0', 10);
  counter += 1;
  
  // Save the updated counter back to localStorage
  localStorage.setItem('invoiceCounter', counter.toString());
  
  // Format counter as 3-digit number with leading zeros
  const sequentialNumber = String(counter).padStart(3, '0');
  
  return `INV-${year}${month}${day}-${sequentialNumber}`;
};

export function CommercialInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', partNum: '', description: 'clothes', commodityCode: '', qty: '150', country: 'UK', weight: '', unitPrice: '', totalAmount: '' }
  ]);

  const addRow = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      partNum: '',
      description: '',
      commodityCode: '',
      qty: '',
      country: '',
      weight: '',
      unitPrice: '',
      totalAmount: ''
    };
    setItems([...items, newItem]);
  };

  const removeRow = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[900px] mx-auto bg-white shadow-lg">
      <div className="p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="IMM Logistics" className="h-16" />
        </div>
        
        {/* Title */}
        <h1 className="text-center text-xl font-bold mb-4">COMMERCIAL INVOICE</h1>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-0.5">Invoice No:</label>
            <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" value={invoiceNumber} readOnly />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-0.5">Invoice date:</label>
            <input type="date" className="w-full border border-gray-400 px-2 py-0.5 text-xs" defaultValue="2026-02-26" />
          </div>
        </div>

        {/* Shipper and Receiver Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Shipper Column */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold mb-0.5">Shipper Name:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs bg-gray-50" defaultValue="IMM Logistics" readOnly />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">Address:</label>
              <textarea className="w-full border border-gray-400 px-2 py-0.5 text-xs resize-none bg-gray-50" rows={2} defaultValue="32 Ilkley Avenue St. Annes Lytham, Fy83qz United Kingdom" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold mb-0.5">Contact Number:</label>
                <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs bg-gray-50" defaultValue="07404895030" readOnly />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-0.5">Company No:</label>
                <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs bg-gray-50" defaultValue="13438834" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">Email:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs bg-gray-50" defaultValue="imm_intel@yahoo.co.uk" readOnly />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">EORI No:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs bg-gray-50" defaultValue="GB277725169000" readOnly />
            </div>
          </div>

          {/* Receiver Column */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold mb-0.5">Receiver Name:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" defaultValue="Alhaja Fatima" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">Address:</label>
              <textarea className="w-full border border-gray-400 px-2 py-0.5 text-xs resize-none" rows={2} defaultValue="19 the Morristown the paddocks Newbridge co kildare" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold mb-0.5">Contact:</label>
                <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" defaultValue="+353899797766" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-0.5">Email:</label>
                <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" defaultValue="fatimajinadu2@gmail.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold mb-0.5">No. of Box:</label>
                <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" defaultValue="3" />
              </div>
              <div></div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">Reason for Shipment:</label>
              <textarea className="w-full border border-gray-400 px-2 py-0.5 text-xs resize-none" rows={2} defaultValue="gift and personal support" />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-2 border-blue-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Part Num</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Description</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Commodity Code</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">QTY. or PCS</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Country of Origin</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">kg Net Weight</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Unit Price</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold">Total Amount £/€</th>
                <th className="border border-gray-400 px-1 py-1 text-[10px] font-semibold print:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.partNum}
                      onChange={(e) => updateItem(item.id, 'partNum', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.commodityCode}
                      onChange={(e) => updateItem(item.id, 'commodityCode', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.country}
                      onChange={(e) => updateItem(item.id, 'country', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.weight}
                      onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0">
                    <input
                      type="text"
                      value={item.totalAmount}
                      onChange={(e) => updateItem(item.id, 'totalAmount', e.target.value)}
                      className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 p-0 print:hidden">
                    <button
                      onClick={() => removeRow(item.id)}
                      className="w-full px-1 py-0.5 text-red-600 hover:bg-red-50 transition-colors"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-3 h-3 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={9} className="border border-gray-400 p-0 print:hidden">
                  <button
                    onClick={addRow}
                    className="w-full px-2 py-1 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Add Row
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={7} className="border border-gray-400 px-2 py-1 text-right font-semibold text-xs">
                  TOTAL:
                </td>
                <td className="border border-gray-400 p-0">
                  <input type="text" className="w-full px-1 py-0.5 text-xs border-0 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 print:hidden"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold mb-0.5">Gross weight of total consignment:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5">Currency:</label>
              <input type="text" className="w-full border border-gray-400 px-2 py-0.5 text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-0.5">For and on behalf of:</label>
            <textarea className="w-full border border-gray-400 px-2 py-0.5 text-xs resize-none h-13" />
          </div>
        </div>

        {/* Print Button */}
        <div className="mt-4 flex justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}