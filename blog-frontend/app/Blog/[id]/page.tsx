/*"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type Blog = {
  id: number;
  documentId: string;
  title: string;
  publishedAt: string;
  content: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
};

export default function BlogDetail() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const blogId = params.id as string;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/blogs/${blogId}`);
        console.log("Blog Response:", response.data); 
        setBlog(response.data.data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

 
  

  return (
    <div >
      <Link href="/Blog">
        geri dön
      </Link>
      
      <h1>{blog.title}</h1>
      <p>Tarih: {new Date(blog.publishedAt).toLocaleDateString('tr-TR')}</p>
      
      <div>
        {blog.content.map((block, index) => (
          <p key={index}>
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}*/


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Card from "@/components/Card";

type Blog = {
  id: number;
  documentId: string;
  title: string;
  publishedat?: string; 
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  content: Array<{
    type: string; 
    children: Array<{ type: string; text: string }>;
  }>;
};

export default function BlogDetail() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const blogId = params.id as string;
  
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/blogs?filters[documentId][$eq]=${blogId}`); // hata düzeltildi
       
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          setBlog(response.data.data[0]);
        }
      } catch (error) {
        console.error("Blog detayı yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    </div>
  );
  
  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313]">
      <div className="text-center">
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-8">
          <p className="text-gray-400 text-lg mb-4">Blog yazısı bulunamadı</p>
          <Link href="/Blog" className="inline-block text-blue-400 hover:text-blue-300">
            Blog listesine dön
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <Link 
            href="/Blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-8 font-medium"
          >
           
            Geri dön
          </Link>
          
          <article className="bg-[#1c1c1c] rounded-md shadow-md border border-gray-800 overflow-hidden">
            <div className="p-6 md:p-8">
          
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center text-gray-400 text-sm mb-8 pb-6 border-b border-gray-800">
                <span className="font-medium">Yayınlanma Tarihi:</span>
                <span className="ml-2">
                  {blog.publishedat && new Date(blog.publishedat).toLocaleDateString ('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none">

                
                {Array.isArray(blog.content) ? (
                  blog.content.map((block, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {/*bak */}
                      {block.children && block.children.map((child, childIndex) => (
                        <span key={childIndex}>{child.text}</span>
                      ))}
                    </p>
                  ))
                ) : typeof blog.content === 'string' ? (
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">{blog.content}</p>
                ) : (
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">İçerik yüklenemedi</p>
                )}
              </div>
            </div>
          </article>
        </Card>
          
        <div className="mt-8 text-center">
          <Link 
            href="/Blog"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-200 font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Tüm blog yazılarını görüntüle
          </Link>
        </div> 
      </div>
    </div> 
  );
}