import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useRouter,
} from '@tanstack/react-router';
import { SiteNav, SiteFooter } from './components/SiteNav';
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CmsPage } from './pages/CmsPage';
import { getPosts } from './api/blog';
import type { BlogPost } from './types';

const rootRoute = createRootRoute({
  loader: async (): Promise<BlogPost[]> => {
    try {
      const data = await getPosts();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
  pendingComponent: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#3f4752' }}>
      // loading posts...
    </div>
  ),
  component: function Root() {
    return (
      <div style={{ minHeight: '100vh', background: '#07090c' }}>
        <SiteNav />
        <Outlet />
        <SiteFooter />
      </div>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    const posts = rootRoute.useLoaderData();
    return <HomePage posts={posts} />;
  },
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: function Blog() {
    const posts = rootRoute.useLoaderData();
    return <BlogListPage posts={posts} />;
  },
});

export const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: function BlogPost() {
    const posts = rootRoute.useLoaderData();
    const { slug } = blogPostRoute.useParams();
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#3f4752' }}>
          // post not found
        </div>
      );
    }
    return <BlogPostPage post={post} posts={posts} />;
  },
});

const cmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cms',
  component: function Cms() {
    const posts = rootRoute.useLoaderData();
    const router = useRouter();
    return <CmsPage posts={posts} onRefresh={() => router.invalidate()} />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogPostRoute,
  cmsRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
