import { Link } from 'react-router-dom';

export default function ReturnExchange() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          রিটার্ন <span className="text-fab-yellow">ও এক্সচেঞ্জ</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">সর্বশেষ আপডেট: ১৯ এপ্রিল, ২০২৬</p>

        <div className="space-y-6 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">যোগ্যতা</h2>
            <p>
              পণ্য পাওয়ার ৭ দিনের মধ্যে আপনি রিটার্ন বা এক্সচেঞ্জের অনুরোধ করতে পারবেন। পণ্য অবশ্যই ব্যবহার না করা, ধোয়া না হওয়া এবং মূল ট্যাগসহ থাকতে হবে।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">যে পণ্য রিটার্নযোগ্য নয়</h2>
            <p>
              কাস্টমাইজড পণ্য, অন্তর্বাস/ইনটিমেট ওয়্যার এবং ক্লিয়ারেন্স পণ্য সাধারণত রিটার্নযোগ্য নয়; তবে পণ্য ক্ষতিগ্রস্ত বা ভুল হলে ব্যতিক্রম প্রযোজ্য।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">কীভাবে অনুরোধ করবেন</h2>
            <p>
              আপনার অর্ডার আইডি, রিটার্ন/এক্সচেঞ্জের কারণ এবং প্রয়োজন হলে পণ্যের ছবি দিয়ে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">রিফান্ড সময়সীমা</h2>
            <p>
              কোয়ালিটি চেক শেষে রিফান্ড প্রক্রিয়া সম্পন্ন হয় এবং আপনার পেমেন্ট মেথড অনুযায়ী ৩-৭ কর্মদিবস সময় লাগতে পারে।
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs uppercase font-black tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/shipping-policy" className="hover:text-fab-yellow transition-colors">শিপিং পলিসি</Link>
          <Link to="/payment-methods" className="hover:text-fab-yellow transition-colors">পেমেন্ট মেথড</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">যোগাযোগ করুন</Link>
        </div>
      </div>
    </div>
  );
}
