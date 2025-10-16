

import React from 'react';
// FIX: Changed to namespace import to fix module resolution issue.
import * as ReactRouterDOM from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';

const BlogCardSkeleton: React.FC = () => (
    <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
        <div className="w-full h-48 bg-brand-primary"></div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="h-6 bg-brand-primary rounded w-3/4 mb-3"></div>
            <div className="space-y-2 flex-grow">
                <div className="h-4 bg-brand-primary rounded w-full"></div>
                <div className="h-4 bg-brand-primary rounded w-5/6"></div>
            </div>
            <div className="h-4 bg-brand-primary rounded w-1/2 mt-4"></div>
        </div>
    </div>
);

const Blog: React.FC = () => {
  const { posts, loading, error } = useBlog();

  return (
    <div className="bg-brand-primary text-white animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">Jiam tech Blog</h1>
          <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl mx-auto">
            Insights on AI trends, company news, and technical deep dives from our team of experts, updated throughout the day.
          </p>
        </div>

        {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        )}

        {error && (
            <div className="text-center py-16 bg-brand-secondary rounded-lg">
                <h2 className="text-2xl font-bold text-red-500">Could Not Load Blog Posts</h2>
                <p className="mt-2 text-brand-text-secondary">{error}</p>
            </div>
        )}

        {!loading && !error && (
          posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <ReactRouterDOM.Link to={`/blog/${post.slug}`} key={post.slug} className="block group">
                  <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 group-hover:-translate-y-2">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6 flex-grow flex flex-col">
                      <h2 className="text-xl font-bold text-white mb-2 flex-grow group-hover:text-brand-accent transition-colors">{post.title}</h2>
                      <p className="text-brand-text-secondary mb-4 text-sm">{post.excerpt}</p>
                      <div className="text-xs text-brand-text-secondary mt-auto">
                        <span>By {post.author}</span> &bull; <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </ReactRouterDOM.Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-brand-secondary rounded-lg">
                <h2 className="text-2xl font-bold text-brand-text-secondary">No Blog Posts Available</h2>
                <p className="mt-2 text-brand-text-secondary">
                    Please check back later for the latest insights on AI.
                </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Blog;