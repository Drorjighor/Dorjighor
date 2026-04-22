import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="page-shell bg-fab-gray-light min-h-screen">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          ব্যবহারের <span className="text-fab-yellow">শর্তাবলি</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">
          কার্যকর তারিখ: ১৯ এপ্রিল, ২০২৬
        </p>

        <div className="space-y-7 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">১. সম্মতি</h2>
            <p>
              এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলি এবং প্রযোজ্য সকল আইন মেনে চলতে সম্মত হচ্ছেন।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">২. অ্যাকাউন্টের দায়বদ্ধতা</h2>
            <p>
              আপনার অ্যাকাউন্টের তথ্য নিরাপদ রাখা এবং অ্যাকাউন্টের মাধ্যমে সংঘটিত সব কার্যক্রমের দায়িত্ব আপনার।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৩. অর্ডার ও পেমেন্ট</h2>
            <p>
              পণ্যের প্রাপ্যতা, মূল্য, ডেলিভারি সময়সীমা এবং অর্ডার গ্রহণের নীতিমালা পরিবর্তিত হতে পারে। প্রয়োজন হলে আমরা
              অর্ডার বাতিল বা প্রত্যাখ্যান করার অধিকার সংরক্ষণ করি।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৪. রিটার্ন ও রিফান্ড</h2>
            <p>
              রিটার্ন ও রিফান্ড আমাদের রিটার্ন নীতিমালা অনুযায়ী পরিচালিত হয়। পণ্যের অবস্থা এবং অনুরোধের সময়সীমার উপর
              যোগ্যতা নির্ভর করতে পারে।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৫. নিষিদ্ধ ব্যবহার</h2>
            <p>
              আপনি সাইটের অপব্যবহার, অননুমোদিত প্রবেশের চেষ্টা, ক্ষতিকর কোড ছড়ানো বা কোনো ব্যবহারকারী/মেধাস্বত্বের অধিকার
              লঙ্ঘন করতে পারবেন না।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৬. শর্তাবলির পরিবর্তন</h2>
            <p>
              আমরা যেকোনো সময় এই শর্তাবলি হালনাগাদ করতে পারি। পরিবর্তনের পর সাইট ব্যবহার অব্যাহত রাখলে তা আপডেটকৃত
              শর্তাবলি গ্রহণ হিসেবে গণ্য হবে।
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs font-bold uppercase tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/privacy" className="hover:text-fab-yellow transition-colors">প্রাইভেসি পলিসি পড়ুন</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">সাপোর্টে যোগাযোগ</Link>
        </div>
      </div>
    </div>
  );
}
