import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-black text-white">
          Freelancer <span className="text-blue-400">Hub</span>
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-blue-500/25"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xl font-medium px-4 py-2 rounded-full mb-8">
          🚀 The Modern Freelancer Marketplace
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          for Your project
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect with talented freelancers, get your work done faster, and grow
          your business with FreelanceHub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl transition shadow-lg shadow-blue-500/25 text-lg"
          >
            Start Hiring →
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl transition text-lg"
          >
            Become a Freelancer
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-black text-blue-400">500+</p>
            <p className="text-slate-400 text-sm mt-1">Freelancers</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-black text-blue-400">1K+</p>
            <p className="text-slate-400 text-sm mt-1">Projects Done</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-black text-blue-400">98%</p>
            <p className="text-slate-400 text-sm mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-black text-white text-center mb-12">
          Why Choose <span className="text-blue-400">FreelanceHub?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-white font-bold text-lg mb-2">
              Secure Payments
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your payments are protected until you are satisfied with the work
              delivered.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-white font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get your projects done quickly with our network of skilled
              freelancers.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-white font-bold text-lg mb-2">AI Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get instant help from our AI powered support chatbot anytime you
              need.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="text-white font-bold text-lg mb-2">
              Verified Reviews
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Read genuine reviews from real clients before hiring any
              freelancer.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-white font-bold text-lg mb-2">
              Real Time Chat
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Communicate directly with freelancers in real time through our
              chat system.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-white font-bold text-lg mb-2">Easy to Use</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Simple and intuitive interface to find and hire the right
              freelancer fast.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-black text-white text-center mb-12">
          How It <span className="text-blue-400">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-white font-bold mb-2">Create Account</h3>
            <p className="text-slate-400 text-sm">
              Sign up as a client or freelancer in minutes with email
              verification.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-white font-bold mb-2">Browse or Post</h3>
            <p className="text-slate-400 text-sm">
              Browse available gigs or post your own services to attract
              clients.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-white font-bold mb-2">Get Work Done</h3>
            <p className="text-slate-400 text-sm">
              Place your order, communicate and get your project delivered on
              time.
            </p>
          </div>


        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 mb-8">
            Join thousands of freelancers and clients on FreelanceHub today.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl transition shadow-lg shadow-blue-500/25 text-lg"
          >
            Join FreelanceHub →
          </button>
        </div>
      </div>

       <div className="border-t border-white/10 px-8 py-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2025 FreelanceHub. Built with MERN Stack.
        </p>
      </div>

    </div>
  );
};

export default Home