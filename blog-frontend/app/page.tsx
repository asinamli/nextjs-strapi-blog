"use client";
import Card from "@/components/Card";

export default function Home() {
  return (
    <Card >
      <div className="space-y-4">
        <p>
          Merhaba, ben Asiye. Bu blog sayfası, Strapi CMS ve Next.js kullanarak oluşturduğum kişisel blog sitemdir.
        </p>
        <p>
          Frontend geliştirme ve web teknolojileri hakkında yazılar paylaşıyorum. Deneyimlerimi, öğrendiklerimi ve ilginç bulduğum konuları burada bulabilirsiniz.
        </p>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-gray-400 italic">
            "Kodlama sanatında, her hata yeni bir ders, her proje yeni bir maceradır."
          </p>
        </div>
      </div>
    </Card>
  );
}
