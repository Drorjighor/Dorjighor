import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="page-shell bg-fab-gray-light min-h-screen">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          প্রাইভেসি <span className="text-fab-yellow">পলিসি</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">
          কার্যকর তারিখ: ১৯ এপ্রিল, ২০২৬
        </p>

        <div className="space-y-7 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">১. আমরা কী তথ্য সংগ্রহ করি</h2>
            <p>
              আপনি অ্যাকাউন্ট তৈরি করলে, অর্ডার করলে বা সাপোর্টে যোগাযোগ করলে আমরা আপনার নাম, ইমেইল ঠিকানা, ফোন নম্বর,
              শিপিং ঠিকানা এবং অর্ডারের তথ্য সংগ্রহ করতে পারি।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">২. আমরা তথ্য কীভাবে ব্যবহার করি</h2>
            <p>
              আমরা আপনার তথ্য ব্যবহার করি অর্ডার প্রসেস করতে, কাস্টমার সাপোর্ট দিতে, সেবা উন্নত করতে এবং আপনার অ্যাকাউন্ট
              ও ক্রয়ের সাথে সম্পর্কিত গুরুত্বপূর্ণ আপডেট পাঠাতে।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৩. ডেটা সংরক্ষণ ও নিরাপত্তা</h2>
            <p>
              ব্যবহারকারীর তথ্য সুরক্ষায় আমরা যৌক্তিক নিরাপত্তা ব্যবস্থা গ্রহণ করি। তবে মনে রাখবেন, কোনো অনলাইন সিস্টেমই
              ১০০% নিরাপত্তা নিশ্চিত করতে পারে না।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৪. তথ্য শেয়ারিং</h2>
            <p>
              আমরা ব্যক্তিগত তথ্য বিক্রি করি না। আপনার অর্ডার সম্পন্ন করা ও সেবা প্রদানের প্রয়োজনেই কেবল বিশ্বস্ত ডেলিভারি
              বা পেমেন্ট পার্টনারের সাথে প্রয়োজনীয় তথ্য শেয়ার করা হতে পারে।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৫. আপনার অধিকার</h2>
            <p>
              আমাদের সাথে যোগাযোগ করে আপনি আপনার প্রোফাইল তথ্য আপডেট বা সংশোধনের অনুরোধ করতে পারেন। আইনগত বা পরিচালনাগত
              শর্তসাপেক্ষে আপনি অ্যাকাউন্ট ডেটা মুছে ফেলার অনুরোধও করতে পারেন।
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">৬. যোগাযোগ</h2>
            <p>
              প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নে আমাদের সাথে support@dorjighor.com এ যোগাযোগ করুন।
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs font-bold uppercase tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/terms" className="hover:text-fab-yellow transition-colors">ব্যবহারের শর্তাবলি পড়ুন</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">সাপোর্টে যোগাযোগ</Link>
        </div>
      </div>
    </div>
  );
}
