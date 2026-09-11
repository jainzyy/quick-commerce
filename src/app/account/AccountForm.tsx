'use client';

import { useState } from 'react';

export default function AccountForm({ handleAuth }: { handleAuth: (formData: FormData) => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <form action={handleAuth} className="space-y-4">
      <input type="hidden" name="action" value={isLogin ? 'login' : 'register'} />
      
      {!isLogin && (
        <>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">First Name</label>
            <input name="first_name" required className="w-full h-12 px-4 rounded-xl border border-surface-container focus:border-primary outline-none bg-surface-container-lowest text-on-surface" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Last Name</label>
            <input name="last_name" required className="w-full h-12 px-4 rounded-xl border border-surface-container focus:border-primary outline-none bg-surface-container-lowest text-on-surface" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Mobile Number</label>
            <input name="mobile_number" required className="w-full h-12 px-4 rounded-xl border border-surface-container focus:border-primary outline-none bg-surface-container-lowest text-on-surface" />
          </div>
        </>
      )}

      <div>
        <label className="block text-label-md text-on-surface-variant mb-1">Email ID</label>
        <input name="email_id" type="email" required className="w-full h-12 px-4 rounded-xl border border-surface-container focus:border-primary outline-none bg-surface-container-lowest text-on-surface" />
      </div>

      <div>
        <label className="block text-label-md text-on-surface-variant mb-1">Password</label>
        <input name="password" type="password" required className="w-full h-12 px-4 rounded-xl border border-surface-container focus:border-primary outline-none bg-surface-container-lowest text-on-surface" />
      </div>

      <button type="submit" className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-button mt-4 hover:bg-primary-container transition-colors">
        {isLogin ? 'Login' : 'Register'}
      </button>

      <div className="text-center mt-4">
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-label-button text-sm">
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </form>
  );
}
