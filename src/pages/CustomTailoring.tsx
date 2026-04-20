import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { UploadCloud, Ruler, Scissors, PenLine, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  garmentFabricCatalog,
  tailoringLaborCharge,
  designTemplates,
  topMeasurementFields,
  bottomMeasurementFields,
  stepTips,
  fabricOptionsByGarment,
  FabricDetail,
  DesignTemplate,
} from '../data/customTailoring';

interface TailoringRequest {
  fullName: string;
  phone: string;
  email: string;
  garmentType: string;
  bust: string;
  topWaist: string;
  hip: string;
  shoulder: string;
  topLength: string;
  sleeveLength: string;
  bottomWaist: string;
  bottomHip: string;
  bottomLength: string;
  fabric: string;
  instructions: string;
  designTemplateId: string;
  designTemplateName: string;
}

function Garment2DGuide({ garmentType, showBottom, selectedFabric }: { garmentType: string; showBottom: boolean; selectedFabric: FabricDetail }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
        <p className="text-[10px] uppercase tracking-widest font-black text-fab-black mb-2">
          {garmentType} 2D Human Measurement Guide
        </p>
        <div className="mb-3 rounded-xl border border-fab-gray-medium bg-white p-3 flex items-center gap-3">
          <img src={selectedFabric.thumbnail} alt={selectedFabric.name} className="w-12 h-12 rounded-md object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">Live Fabric View</p>
            <p className="text-xs text-fab-text-muted">Selected: {selectedFabric.name}</p>
          </div>
        </div>
        <svg viewBox="0 0 420 300" className="w-full h-auto rounded-lg bg-white border border-fab-gray-medium p-3" role="img" aria-label="Human body 2D measurement guide">
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#1a1a1a" />
            </marker>
          </defs>

          <g fill="none" stroke="#1a1a1a" strokeWidth="2">
            <circle cx="210" cy="38" r="20" />
            <path d="M170 78 L190 66 L230 66 L250 78 L262 120 L242 124 L236 98 L236 242 L184 242 L184 98 L178 124 L158 120 Z" fill={selectedFabric.tone} />
          </g>

          <g fill="none" strokeWidth="3">
            <line x1="186" y1="106" x2="234" y2="106" stroke="#fec400" />
            <line x1="188" y1="132" x2="232" y2="132" stroke="#ef4444" />
            <line x1="188" y1="156" x2="232" y2="156" stroke="#8b5cf6" />
            <line x1="190" y1="66" x2="230" y2="66" stroke="#22c55e" />
            <line x1="245" y1="86" x2="267" y2="123" stroke="#0ea5e9" />
            <line x1="245" y1="66" x2="245" y2="242" stroke="#f97316" />
          </g>

          <g fill="#1a1a1a" fontSize="11" fontWeight="700">
            <text x="24" y="110">Bust</text>
            <text x="24" y="136">Waist</text>
            <text x="24" y="160">Hip</text>
            <text x="282" y="70">Shoulder</text>
            <text x="292" y="122">Sleeve</text>
            <text x="258" y="160">Top Length</text>
          </g>

          <g fill="none" stroke="#1a1a1a" strokeWidth="1.6" markerEnd="url(#arrow)">
            <line x1="64" y1="106" x2="184" y2="106" />
            <line x1="64" y1="132" x2="186" y2="132" />
            <line x1="64" y1="156" x2="186" y2="156" />
            <line x1="337" y1="66" x2="231" y2="66" />
            <line x1="342" y1="120" x2="267" y2="121" />
            <line x1="333" y1="156" x2="246" y2="156" />
          </g>
        </svg>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
          <p><span className="text-fab-black">Bust:</span> বুকের পূর্ণ অংশ</p>
          <p><span className="text-fab-black">Waist:</span> কোমরের সরু অংশ</p>
          <p><span className="text-fab-black">Hip:</span> হিপের চওড়া অংশ</p>
          <p><span className="text-fab-black">Shoulder:</span> কাঁধ থেকে কাঁধ</p>
          <p><span className="text-fab-black">Sleeve:</span> কাঁধ থেকে হাতার শেষ</p>
          <p><span className="text-fab-black">Top Length:</span> কাঁধ থেকে নিচে</p>
        </div>
      </div>

      {showBottom && (
        <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
          <p className="text-[10px] uppercase tracking-widest font-black text-fab-black mb-2">Bottom 2D Human Measurement Guide</p>
          <svg viewBox="0 0 420 260" className="w-full h-auto rounded-lg bg-white border border-fab-gray-medium p-3" role="img" aria-label="Bottom human 2D measurement guide">
            <defs>
              <marker id="arrowBottom" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#1a1a1a" />
              </marker>
            </defs>

            <g fill="none" stroke="#1a1a1a" strokeWidth="2">
              <path d="M176 24 L244 24 L236 244 L206 244 L198 130 L190 244 L160 244 Z" fill={selectedFabric.tone} />
              <line x1="178" y1="36" x2="242" y2="36" stroke="#fec400" strokeWidth="3" />
              <line x1="176" y1="76" x2="244" y2="76" stroke="#ef4444" strokeWidth="3" />
              <line x1="250" y1="24" x2="250" y2="244" stroke="#f97316" strokeWidth="3" />
            </g>

            <g fill="#1a1a1a" fontSize="11" fontWeight="700">
              <text x="36" y="39">Bottom Waist</text>
              <text x="36" y="79">Bottom Hip</text>
              <text x="260" y="136">Bottom Length</text>
            </g>

            <g fill="none" stroke="#1a1a1a" strokeWidth="1.6" markerEnd="url(#arrowBottom)">
              <line x1="132" y1="36" x2="178" y2="36" />
              <line x1="122" y1="76" x2="176" y2="76" />
              <line x1="352" y1="136" x2="250" y2="136" />
            </g>
          </svg>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
            <p><span className="text-fab-black">Bottom Waist:</span> কোমর ঘিরে</p>
            <p><span className="text-fab-black">Bottom Hip:</span> হিপের চওড়া অংশ</p>
            <p><span className="text-fab-black">Bottom Length:</span> কোমর থেকে নিচে</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomTailoring() {
  const { isAuthenticated, isReady, user } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState<TailoringRequest>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    garmentType: 'Panjabi',
    bust: '',
    topWaist: '',
    hip: '',
    shoulder: '',
    topLength: '',
    sleeveLength: '',
    bottomWaist: '',
    bottomHip: '',
    bottomLength: '',
    fabric: 'Cotton Premium',
    instructions: '',
    designTemplateId: '',
    designTemplateName: '',
  });
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Card'>('bKash');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [showFabricDetails, setShowFabricDetails] = useState(false);
  const [showDesignDetails, setShowDesignDetails] = useState(false);
  const [showFabricPicker, setShowFabricPicker] = useState(false);
  const [showDesignPicker, setShowDesignPicker] = useState(false);

  const requiresBottomMeasurements = useMemo(
    () => ['Kurti'].includes(form.garmentType),
    [form.garmentType]
  );

  const garmentSpecificDesigns = useMemo(
    () => designTemplates.filter((template) => template.garmentTypes.includes(form.garmentType)),
    [form.garmentType]
  );

  const fabricChoices = useMemo(
    () => garmentFabricCatalog[form.garmentType] || garmentFabricCatalog.Panjabi,
    [form.garmentType]
  );

  const selectedFabric = useMemo(
    () => fabricChoices.find((item) => item.name === form.fabric) || fabricChoices[0],
    [fabricChoices, form.fabric]
  );

  const selectedDesignTemplate = useMemo(
    () => garmentSpecificDesigns.find((template) => template.id === form.designTemplateId) || null,
    [garmentSpecificDesigns, form.designTemplateId]
  );

  const canSubmit = useMemo(() => {
    return Boolean(
      form.fullName.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.garmentType.trim() &&
      form.bust.trim() &&
      form.topWaist.trim() &&
      form.hip.trim() &&
      form.shoulder.trim() &&
      form.topLength.trim() &&
      form.sleeveLength.trim() &&
      (!requiresBottomMeasurements || (form.bottomWaist.trim() && form.bottomHip.trim() && form.bottomLength.trim())) &&
      form.fabric.trim() &&
      form.instructions.trim() &&
      (form.designTemplateId.trim() || designFile)
    );
  }, [designFile, form, requiresBottomMeasurements]);

  const totalBill = useMemo(() => {
    const fabricCost = Math.round(selectedFabric.ratePerYard * selectedFabric.requiredYard);
    const laborCost = tailoringLaborCharge[form.garmentType] || 900;
    return fabricCost + laborCost;
  }, [form.garmentType, selectedFabric]);

  const estimatedFabricCost = useMemo(
    () => Math.round(selectedFabric.ratePerYard * selectedFabric.requiredYard),
    [selectedFabric]
  );

  const estimatedLaborCost = tailoringLaborCharge[form.garmentType] || 900;

  const advanceAmount = useMemo(() => Math.round(totalBill * 0.2), [totalBill]);
  const dueAmount = Math.max(totalBill - advanceAmount, 0);

  const requiredKeys = useMemo(() => {
    const base: Array<keyof TailoringRequest> = [
      'fullName',
      'phone',
      'email',
      'garmentType',
      'bust',
      'topWaist',
      'hip',
      'shoulder',
      'topLength',
      'sleeveLength',
      'fabric',
      'instructions',
    ];

    if (requiresBottomMeasurements) {
      base.push('bottomWaist', 'bottomHip', 'bottomLength');
    }

    return base;
  }, [requiresBottomMeasurements]);

  const completedCount = useMemo(() => {
    const done = requiredKeys.filter((key) => String(form[key]).trim()).length;
    const designDone = form.designTemplateId.trim() || designFile ? 1 : 0;
    return done + designDone;
  }, [designFile, form, requiredKeys]);

  const totalRequiredCount = requiredKeys.length + 1;
  const progressPercent = Math.round((completedCount / totalRequiredCount) * 100);

  const missingChecklist = useMemo(() => {
    const missing: string[] = [];

    if (!form.fullName.trim()) missing.push('Full Name');
    if (!form.phone.trim()) missing.push('Phone');
    if (!form.email.trim()) missing.push('Email');
    if (!form.bust.trim()) missing.push('Bust');
    if (!form.topWaist.trim()) missing.push('Top Waist');
    if (!form.hip.trim()) missing.push('Hip');
    if (!form.shoulder.trim()) missing.push('Shoulder');
    if (!form.topLength.trim()) missing.push('Top Length');
    if (!form.sleeveLength.trim()) missing.push('Sleeve Length');
    if (requiresBottomMeasurements && !form.bottomWaist.trim()) missing.push('Bottom Waist');
    if (requiresBottomMeasurements && !form.bottomHip.trim()) missing.push('Bottom Hip');
    if (requiresBottomMeasurements && !form.bottomLength.trim()) missing.push('Bottom Length');
    if (!form.instructions.trim()) missing.push('Instruction');
    if (!(form.designTemplateId.trim() || designFile)) missing.push('Design Select/Upload');

    return missing;
  }, [designFile, form, requiresBottomMeasurements]);

  useEffect(() => {
    if (garmentSpecificDesigns.length > 0) {
      setForm((prev) => {
        if (prev.designTemplateId && garmentSpecificDesigns.some((d) => d.id === prev.designTemplateId)) {
          return prev;
        }

        return {
          ...prev,
          designTemplateId: garmentSpecificDesigns[0].id,
          designTemplateName: garmentSpecificDesigns[0].name,
        };
      });
    }
  }, [garmentSpecificDesigns]);

  useEffect(() => {
    if (!selectedFabric) return;
    if (form.fabric !== selectedFabric.name) {
      setForm((prev) => ({ ...prev, fabric: selectedFabric.name }));
    }
  }, [form.fabric, selectedFabric]);

  useEffect(() => {
    setShowFabricDetails(false);
    setShowFabricPicker(false);
  }, [form.garmentType]);

  useEffect(() => {
    setShowDesignDetails(false);
    setShowDesignPicker(false);
  }, [form.designTemplateId, form.garmentType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fabricParam = params.get('fabric');
    const garmentTypeParam = params.get('garmentType');

    const resolvedGarmentType = garmentTypeParam && garmentFabricCatalog[garmentTypeParam] ? garmentTypeParam : fabricParam ? fabricOptionsByGarment[fabricParam]?.[0] : null;

    if (!resolvedGarmentType && !fabricParam) return;

    setForm((prev) => {
      const nextGarmentType = resolvedGarmentType || prev.garmentType;
      const nextFabricChoices = garmentFabricCatalog[nextGarmentType] || garmentFabricCatalog.Panjabi;
      const nextFabric = fabricParam && nextFabricChoices.some((item) => item.name === fabricParam) ? fabricParam : nextFabricChoices[0].name;

      return {
        ...prev,
        garmentType: nextGarmentType,
        fabric: nextFabric,
      };
    });
  }, [location.search]);

  if (!isReady) {
    return (
      <div className="page-shell min-h-screen bg-fab-gray-light flex items-center justify-center">
        <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted">Loading tailoring...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/custom-tailoring' } }} />;
  }

  const updateField = (field: keyof TailoringRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDesignUpload = (file: File | null) => {
    setDesignFile(file);

    if (!file) {
      setDesignPreview('');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setDesignPreview(previewUrl);
  };

  const selectTemplate = (template: DesignTemplate) => {
    setForm((prev) => ({
      ...prev,
      designTemplateId: template.id,
      designTemplateName: template.name,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setPaymentError('');
    setIsPaymentStep(true);
  };

  const handleAdvancePayment = () => {
    if (!isPaymentStep) return;

    if (paymentReference.trim().length < 6) {
      setPaymentError('একটি valid payment reference দিন (কমপক্ষে ৬ অক্ষর)।');
      return;
    }

    setIsSaving(true);
    setPaymentError('');

    const savedRequests = JSON.parse(localStorage.getItem('dorjighor-tailoring-requests') || '[]');
    const nextRequest = {
      id: `CT-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...form,
      totalBill,
      advancePaid: advanceAmount,
      dueAmount,
      paymentMethod,
      paymentReference,
      designFileName: designFile?.name || '',
      designPreview,
    };

    savedRequests.unshift(nextRequest);
    localStorage.setItem('dorjighor-tailoring-requests', JSON.stringify(savedRequests));

    setTimeout(() => {
      setIsSubmitted(true);
      setIsSaving(false);
      setIsPaymentStep(false);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="page-shell min-h-screen bg-fab-gray-light">
        <div className="max-w-3xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 text-center">
          <CheckCircle2 size={40} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-3">
            Design <span className="text-fab-yellow">Submitted</span>
          </h1>
          <p className="text-sm text-fab-text-muted mb-6">
            Your custom tailoring request has been saved with 20% advance payment. Our team will review your design and measurements.
          </p>
          <div className="max-w-md mx-auto rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4 mb-6 text-left">
            <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Payment Summary</p>
            <div className="space-y-1.5 text-xs text-fab-black">
              <p className="flex justify-between"><span>Total Bill</span><span>৳{totalBill.toLocaleString()}</span></p>
              <p className="flex justify-between"><span>Advance Paid (20%)</span><span>৳{advanceAmount.toLocaleString()}</span></p>
              <p className="flex justify-between font-black"><span>Remaining Due</span><span>৳{dueAmount.toLocaleString()}</span></p>
            </div>
          </div>
          <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted mb-8">
            Upload your design, confirm deposit, and get custom stitching
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/account/orders" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
              View Request History
            </Link>
            <Link to="/products" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
              Browse Fabrics
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Dorjighor Main Power</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Custom <span className="text-fab-yellow">Tailoring</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl">
            প্রথমবার মাপ দিচ্ছেন? সমস্যা নেই। নিচের step-by-step guide follow করে সহজে সঠিক মাপ দিন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="mb-6 rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">Form Completion</p>
                <p className="text-xs font-black uppercase tracking-widest text-fab-text-muted">
                  {completedCount}/{totalRequiredCount} Completed
                </p>
              </div>
              <div className="h-2 rounded-full bg-white border border-fab-gray-medium overflow-hidden">
                <div className="h-full bg-fab-yellow transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted mt-2">
                Progress: {progressPercent}%
              </p>
            </div>

            <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-fab-gray-light border border-fab-gray-medium">
              <Sparkles size={18} className="text-fab-yellow mt-1" />
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest mb-2">New User Friendly Flow</h2>
                <div className="space-y-1">
                  {stepTips.map((tip) => (
                    <p key={tip} className="text-[11px] text-fab-text-muted">
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Step 1 - Full Name</label>
                  <input value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Step 1 - Phone</label>
                  <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Step 1 - Email</label>
                  <input value={form.email} onChange={(e) => updateField('email', e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Step 1 - Garment Type</label>
                  <select value={form.garmentType} onChange={(e) => updateField('garmentType', e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white" required>
                    <option>Panjabi</option>
                    <option>Sherwani</option>
                    <option>Kurti</option>
                    <option>Saree Blouse</option>
                    <option>Shirt</option>
                    <option>Blazer</option>
                  </select>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Ruler size={16} className="text-fab-yellow" />Step 2 - Measurements</h2>
                <p className="text-xs text-fab-text-muted mb-4">
                  নিচের guide দেখে মাপ নিন। টেপ body-fit করে ধরবেন, বেশি tight বা loose না। প্রতিটি ঘরে inch এ মান লিখুন।
                </p>

                <div className="space-y-5">
                  <div className="rounded-xl border border-fab-gray-medium p-4 bg-fab-gray-light">
                    <h3 className="text-xs uppercase font-black tracking-widest mb-3 text-fab-black">Top Measurements ({form.garmentType})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {topMeasurementFields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">{field.label}</label>
                          <input
                            value={form[field.key]}
                            onChange={(e) => updateField(field.key, e.target.value)}
                            className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white"
                            inputMode="decimal"
                            placeholder={field.placeholder}
                            required
                          />
                          <p className="text-[10px] text-fab-text-muted mt-1">{field.helper}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-fab-gray-medium p-4 bg-fab-gray-light">
                    <h3 className="text-xs uppercase font-black tracking-widest mb-3 text-fab-black">Bottom Measurements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {bottomMeasurementFields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">{field.label}</label>
                          <input
                            value={form[field.key]}
                            onChange={(e) => updateField(field.key, e.target.value)}
                            className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white"
                            inputMode="decimal"
                            placeholder={field.placeholder}
                            required={requiresBottomMeasurements}
                          />
                          <p className="text-[10px] text-fab-text-muted mt-1">{field.helper}</p>
                        </div>
                      ))}
                    </div>
                    {!requiresBottomMeasurements && (
                      <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted mt-3">
                        Bottom measurement optional for {form.garmentType}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Scissors size={16} className="text-fab-yellow" />Step 3 - Fabric Select</h2>
                <div className="mb-3 rounded-xl border border-fab-gray-medium bg-fab-gray-light p-3">
                  <p className="text-[10px] uppercase tracking-widest font-black text-fab-black mb-1">
                    {form.garmentType} Fabric Rule
                  </p>
                  <p className="text-xs text-fab-text-muted">
                    ১ পিস {form.garmentType} বানাতে <span className="font-black text-fab-black">{selectedFabric.requiredYard} yard</span> কাপড় লাগবে।
                    রেট: <span className="font-black text-fab-black">৳{selectedFabric.ratePerYard}/yard</span>
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                    এই fabric একাধিক garment type-এ ব্যবহার করা যায়: <span className="text-fab-black">{fabricOptionsByGarment[selectedFabric.name]?.join(', ')}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-fab-gray-medium bg-white p-4 space-y-3">
                  <div className="relative">
                    <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Select Fabric</label>
                    <button
                      type="button"
                      onClick={() => setShowFabricPicker((prev) => !prev)}
                      className="w-full min-h-12 rounded-lg border border-fab-gray-medium px-3 py-2 text-left outline-none focus:border-fab-yellow bg-white flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={selectedFabric.thumbnail} alt={selectedFabric.name} className="w-10 h-10 rounded-md object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <p className="text-xs font-black uppercase tracking-widest text-fab-black truncate">{selectedFabric.name}</p>
                          <p className="text-[10px] text-fab-text-muted truncate">৳{selectedFabric.ratePerYard}/yard - Need {selectedFabric.requiredYard} yard</p>
                        </div>
                      </div>
                      <span className="text-sm text-fab-text-muted">v</span>
                    </button>

                    {showFabricPicker && (
                      <div className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto rounded-lg border border-fab-gray-medium bg-white shadow-2xl">
                        {fabricChoices.map((fabric) => (
                          <button
                            key={fabric.name}
                            type="button"
                            onClick={() => {
                              updateField('fabric', fabric.name);
                              setShowFabricPicker(false);
                            }}
                            className={`w-full px-3 py-2 flex items-center gap-3 text-left border-b border-fab-gray-medium last:border-0 hover:bg-fab-gray-light transition-colors ${form.fabric === fabric.name ? 'bg-fab-yellow/10' : ''}`}
                          >
                            <img src={fabric.thumbnail} alt={fabric.name} className="w-10 h-10 rounded-md object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <p className="text-xs font-black uppercase tracking-widest text-fab-black truncate">{fabric.name}</p>
                              <p className="text-[10px] text-fab-text-muted truncate">৳{fabric.ratePerYard}/yard - Need {fabric.requiredYard} yard</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFabricDetails((prev) => !prev)}
                    className="w-full flex items-center gap-3 rounded-xl border border-fab-gray-medium bg-fab-gray-light p-3 text-left hover:border-fab-yellow transition-colors"
                  >
                    <img src={selectedFabric.thumbnail} alt={selectedFabric.name} className="w-16 h-16 rounded-lg object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">{selectedFabric.name}</p>
                      <p className="text-xs text-fab-text-muted mt-1">Click to view full fabric details</p>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-fab-yellow">{showFabricDetails ? 'Hide' : 'Show'}</span>
                  </button>

                  <div className={`overflow-hidden rounded-xl border border-fab-gray-medium bg-fab-gray-light transition-all duration-300 ${showFabricDetails ? 'max-h-[420px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0 border-transparent'}`}>
                    {showFabricDetails && (
                      <div className="space-y-4">
                        <img src={selectedFabric.thumbnail} alt={selectedFabric.name} className="w-full h-44 rounded-lg object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                        <div className="grid grid-cols-2 gap-3 text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                          <p><span className="text-fab-black">Fabric:</span> {selectedFabric.name}</p>
                          <p><span className="text-fab-black">Rate:</span> ৳{selectedFabric.ratePerYard}/yard</p>
                          <p><span className="text-fab-black">Need:</span> {selectedFabric.requiredYard} yard</p>
                          <p><span className="text-fab-black">Tone:</span> {selectedFabric.tone}</p>
                        </div>
                        <div className="rounded-lg border border-fab-gray-medium bg-white p-3">
                          <p className="text-[10px] uppercase tracking-widest font-black text-fab-black mb-2">Can be used for</p>
                          <div className="flex flex-wrap gap-2">
                            {fabricOptionsByGarment[selectedFabric.name]?.map((garmentType) => (
                              <span key={garmentType} className="px-2 py-1 rounded-md bg-fab-yellow/15 text-fab-black text-[10px] uppercase tracking-widest font-black">
                                {garmentType}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2"><UploadCloud size={16} className="text-fab-yellow" />Step 4 - Design Select / Upload</h2>
                <div className="rounded-xl border border-fab-gray-medium bg-white p-4 space-y-3">
                  <div className="relative">
                    <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Select Design</label>
                    <button
                      type="button"
                      onClick={() => setShowDesignPicker((prev) => !prev)}
                      className="w-full min-h-12 rounded-lg border border-fab-gray-medium px-3 py-2 text-left outline-none focus:border-fab-yellow bg-white flex items-center justify-between gap-3"
                    >
                      {selectedDesignTemplate ? (
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={selectedDesignTemplate.image} alt={selectedDesignTemplate.name} className="w-10 h-10 rounded-md object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                          <div className="min-w-0">
                            <p className="text-xs font-black uppercase tracking-widest text-fab-black truncate">{selectedDesignTemplate.name}</p>
                            <p className="text-[10px] text-fab-text-muted truncate">{selectedDesignTemplate.garmentTypes.join(', ')}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs font-bold uppercase tracking-widest text-fab-text-muted">Choose a design template</p>
                      )}
                      <span className="text-sm text-fab-text-muted">v</span>
                    </button>

                    {showDesignPicker && (
                      <div className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto rounded-lg border border-fab-gray-medium bg-white shadow-2xl">
                        {garmentSpecificDesigns.map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => {
                              selectTemplate(template);
                              setShowDesignPicker(false);
                            }}
                            className={`w-full px-3 py-2 flex items-center gap-3 text-left border-b border-fab-gray-medium last:border-0 hover:bg-fab-gray-light transition-colors ${form.designTemplateId === template.id ? 'bg-fab-yellow/10' : ''}`}
                          >
                            <img src={template.image} alt={template.name} className="w-10 h-10 rounded-md object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <p className="text-xs font-black uppercase tracking-widest text-fab-black truncate">{template.name}</p>
                              <p className="text-[10px] text-fab-text-muted truncate">{template.garmentTypes.join(', ')}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedDesignTemplate && (
                    <button
                      type="button"
                      onClick={() => setShowDesignDetails((prev) => !prev)}
                      className="w-full flex items-center gap-3 rounded-xl border border-fab-gray-medium bg-fab-gray-light p-3 text-left hover:border-fab-yellow transition-colors"
                    >
                      <img
                        src={selectedDesignTemplate.image}
                        alt={selectedDesignTemplate.name}
                        className="w-16 h-16 rounded-lg object-cover border border-fab-gray-medium"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">{selectedDesignTemplate.name}</p>
                        <p className="text-xs text-fab-text-muted mt-1">Click to preview the design in detail</p>
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-fab-yellow">{showDesignDetails ? 'Hide' : 'Show'}</span>
                    </button>
                  )}

                  <div className={`overflow-hidden rounded-xl border border-fab-gray-medium bg-fab-gray-light transition-all duration-300 ${showDesignDetails && selectedDesignTemplate ? 'max-h-[460px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0 border-transparent'}`}>
                    {showDesignDetails && selectedDesignTemplate && (
                      <div className="space-y-4">
                        <img
                          src={selectedDesignTemplate.image}
                          alt={selectedDesignTemplate.name}
                          className="w-full h-56 rounded-lg object-cover border border-fab-gray-medium"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">{selectedDesignTemplate.name}</p>
                          <p className="text-xs text-fab-text-muted">This design can be used for: {selectedDesignTemplate.garmentTypes.join(', ')}</p>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                            Final output will follow your selected fabric, measurements and instructions.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                    Dropdown list stays scrollable for large design libraries.
                  </p>
                </div>

                <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-fab-gray-medium bg-fab-gray-light p-8 text-center cursor-pointer hover:border-fab-yellow transition-colors">
                  <UploadCloud size={24} className="text-fab-yellow" />
                  <span className="text-xs font-black uppercase tracking-widest text-fab-black">Upload new custom design</span>
                  <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">PNG, JPG, PDF or sketch upload</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleDesignUpload(e.target.files?.[0] || null)}
                  />
                </label>
                {designFile && (
                  <p className="mt-3 text-xs font-bold text-fab-text-muted uppercase tracking-widest">Selected: {designFile.name}</p>
                )}
                {form.designTemplateName && (
                  <p className="mt-2 text-xs font-bold text-fab-text-muted uppercase tracking-widest">Template: {form.designTemplateName}</p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2"><PenLine size={16} className="text-fab-yellow" />Step 5 - Instruction Box</h2>
                <textarea
                  value={form.instructions}
                  onChange={(e) => updateField('instructions', e.target.value)}
                  rows={5}
                  placeholder="উদাহরণ: একটু ঢিলা ফিট চাই, ফুল হাতা চাই, গলার নকশা simple চাই"
                  className="w-full rounded-lg border border-fab-gray-medium px-4 py-3 text-sm outline-none focus:border-fab-yellow resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit || isSaving}
                className="w-full h-12 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                <Sparkles size={14} />
                <span>{isSaving ? 'Processing...' : 'Submit & Continue to 20% Payment'}</span>
              </button>
            </form>

            {isPaymentStep && (
              <div className="mt-6 rounded-2xl border border-fab-yellow bg-fab-yellow/10 p-5">
                <h3 className="text-sm font-black uppercase tracking-widest mb-3">Advance Payment Required</h3>
                <p className="text-xs text-fab-text-muted mb-4">
                  আপনার request final করতে মোট বিলের ২০% অগ্রিম পেমেন্ট করতে হবে।
                </p>

                <div className="rounded-xl border border-fab-gray-medium bg-white p-4 mb-4">
                  <div className="space-y-2 text-xs text-fab-black">
                    <p className="flex justify-between"><span>Fabric ({selectedFabric.requiredYard} yard × ৳{selectedFabric.ratePerYard})</span><span>৳{estimatedFabricCost.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Tailoring Labor</span><span>৳{estimatedLaborCost.toLocaleString()}</span></p>
                    <p className="flex justify-between font-black border-t border-fab-gray-medium pt-2"><span>Total Bill</span><span>৳{totalBill.toLocaleString()}</span></p>
                    <p className="flex justify-between font-black"><span>Pay Now (20%)</span><span>৳{advanceAmount.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Pay Later</span><span>৳{dueAmount.toLocaleString()}</span></p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Payment Method</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['bKash', 'Nagad', 'Card'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`h-10 rounded-lg border text-[10px] uppercase font-black tracking-widest transition-all ${paymentMethod === method ? 'bg-fab-black text-white border-fab-black' : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow'}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">
                    Payment Reference / Trx ID
                  </label>
                  <input
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white"
                    placeholder="যেমন: BK12345678"
                  />
                </div>

                {paymentError && (
                  <p className="text-xs font-bold text-red-600 mb-3">{paymentError}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAdvancePayment}
                    disabled={isSaving}
                    className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-60"
                  >
                    {isSaving ? 'Verifying Payment...' : `Pay 20% (৳${advanceAmount.toLocaleString()}) & Confirm`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPaymentStep(false)}
                    disabled={isSaving}
                    className="h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow transition-all disabled:opacity-60"
                  >
                    Back to Edit Form
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-6">
            <Garment2DGuide garmentType={form.garmentType} showBottom={requiresBottomMeasurements} selectedFabric={selectedFabric} />

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-3">Billing Breakdown</h3>
              <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4 mb-5">
                <div className="space-y-2 text-xs text-fab-black">
                  <p className="flex justify-between"><span>Fabric Need</span><span>{selectedFabric.requiredYard} yard</span></p>
                  <p className="flex justify-between"><span>Fabric Cost</span><span>৳{estimatedFabricCost.toLocaleString()}</span></p>
                  <p className="flex justify-between"><span>Tailoring Labor</span><span>৳{estimatedLaborCost.toLocaleString()}</span></p>
                  <p className="flex justify-between font-black border-t border-fab-gray-medium pt-2"><span>Total Bill</span><span>৳{totalBill.toLocaleString()}</span></p>
                  <p className="flex justify-between text-fab-text-muted"><span>Advance (20%)</span><span>৳{advanceAmount.toLocaleString()}</span></p>
                </div>
              </div>

              <h3 className="text-sm font-black uppercase tracking-widest mb-3">Live Checklist</h3>
              <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4 mb-5">
                {missingChecklist.length === 0 ? (
                  <p className="text-xs font-bold text-green-700">সবকিছু complete হয়েছে। এখন submit করতে পারবেন।</p>
                ) : (
                  <>
                    <p className="text-[10px] uppercase tracking-widest font-black text-fab-black mb-2">Remaining Items</p>
                    <div className="flex flex-wrap gap-2">
                      {missingChecklist.slice(0, 8).map((item) => (
                        <span key={item} className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-white border border-fab-gray-medium text-fab-text-muted">
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <h3 className="text-sm font-black uppercase tracking-widest mb-3">How to Measure (Guide)</h3>

              <div className="space-y-4">
                <div className="rounded-xl border border-fab-gray-medium p-4 bg-fab-gray-light">
                  <p className="text-[10px] uppercase font-black tracking-widest text-fab-black mb-2">Top (Kurti) - কোথা থেকে মাপবেন</p>
                  <ul className="space-y-1.5 text-xs text-fab-text-muted">
                    <li><span className="font-black text-fab-black">Bust:</span> বুকের সবচেয়ে ভরা অংশ ঘিরে</li>
                    <li><span className="font-black text-fab-black">Waist:</span> কোমরের সরু অংশ ঘিরে</li>
                    <li><span className="font-black text-fab-black">Hip:</span> হিপের চওড়া অংশ ঘিরে</li>
                    <li><span className="font-black text-fab-black">Shoulder:</span> এক কাঁধ থেকে অন্য কাঁধ</li>
                    <li><span className="font-black text-fab-black">Top Length:</span> কাঁধের ওপর থেকে নিচে যত লম্বা চান</li>
                    <li><span className="font-black text-fab-black">Sleeve Length:</span> কাঁধ থেকে হাতার শেষ পর্যন্ত</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-fab-gray-medium p-4 bg-fab-gray-light">
                  <p className="text-[10px] uppercase font-black tracking-widest text-fab-black mb-2">Bottom - কোথা থেকে মাপবেন</p>
                  <ul className="space-y-1.5 text-xs text-fab-text-muted">
                    <li><span className="font-black text-fab-black">Bottom Waist:</span> বটম/প্যান্টের কোমর ঘিরে</li>
                    <li><span className="font-black text-fab-black">Bottom Hip:</span> হিপের সবচেয়ে চওড়া অংশ ঘিরে</li>
                    <li><span className="font-black text-fab-black">Bottom Length:</span> কোমর থেকে গোড়ালি/চাহিদামতো নিচ পর্যন্ত</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-dashed border-fab-yellow p-3 bg-fab-yellow/10">
                  <p className="text-[10px] uppercase tracking-widest font-black text-fab-black">
                    Tip: সম্ভব হলে নিজের পছন্দের ড্রেস/কুর্তি/বটম বিছিয়ে মাপ নিন, তারপর ইনপুট দিন।
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-3">What happens next?</h3>
              <ol className="space-y-3 text-xs font-medium text-fab-text-muted">
                <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-fab-yellow text-fab-black flex items-center justify-center font-black text-[10px]">1</span> We review your design and measurements.</li>
                <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-fab-yellow text-fab-black flex items-center justify-center font-black text-[10px]">2</span> Our tailor confirms fabric, fit, and pricing.</li>
                <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-fab-yellow text-fab-black flex items-center justify-center font-black text-[10px]">3</span> Your custom stitching starts after confirmation.</li>
              </ol>
            </div>

            {designPreview && (
              <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
                <h3 className="text-sm font-black uppercase tracking-widest mb-4">Design Preview</h3>
                <img src={designPreview} alt="Design preview" className="w-full rounded-xl border border-fab-gray-medium object-cover" />
              </div>
            )}

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">Tailoring Note</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Add your references and measurements carefully. The more detailed your instructions, the better the fit and finish.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
