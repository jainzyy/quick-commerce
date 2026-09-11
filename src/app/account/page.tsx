import { cookies } from 'next/headers';
import db from '@/db';
import { redirect } from 'next/navigation';
import AccountForm from './AccountForm';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  // Ensure table exists
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      mobile_number TEXT UNIQUE,
      email_id TEXT UNIQUE,
      password TEXT
    )
  `);

  let user = null;
  if (userId) {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [userId]
    });
    if (result.rows.length > 0) {
      user = result.rows[0];
    }
  }

  async function handleAuth(formData: FormData) {
    'use server';
    const email_id = formData.get('email_id') as string;
    const password = formData.get('password') as string;
    const action = formData.get('action') as string;

    if (action === 'login') {
      const result = await db.execute({
        sql: 'SELECT id, password FROM users WHERE email_id = ?',
        args: [email_id]
      });
      if (result.rows.length > 0 && result.rows[0].password === password) {
        const cookieStore = await cookies();
        cookieStore.set('userId', String(result.rows[0].id));
      }
    } else if (action === 'register') {
      const first_name = formData.get('first_name') as string;
      const last_name = formData.get('last_name') as string;
      const mobile_number = formData.get('mobile_number') as string;

      const result = await db.execute({
        sql: 'INSERT INTO users (first_name, last_name, mobile_number, email_id, password) VALUES (?, ?, ?, ?, ?)',
        args: [first_name, last_name, mobile_number, email_id, password]
      });
      const cookieStore = await cookies();
      cookieStore.set('userId', String(result.lastInsertRowid));
    } else if (action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete('userId');
    }
    
    redirect('/account');
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background max-w-container-max-width mx-auto px-grid-gutter flex justify-center items-start">
      <div className="bg-surface-container-low w-full max-w-md p-8 rounded-2xl shadow-sm">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-6 text-center">
          {user ? 'My Account' : 'Login / Register'}
        </h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container">
              <p className="font-body-md text-on-surface"><strong>Name:</strong> {String(user.first_name)} {String(user.last_name)}</p>
              <p className="font-body-md text-on-surface"><strong>Email:</strong> {String(user.email_id)}</p>
              <p className="font-body-md text-on-surface"><strong>Mobile:</strong> {String(user.mobile_number)}</p>
            </div>
            <form action={handleAuth}>
              <input type="hidden" name="action" value="logout" />
              <button type="submit" className="w-full bg-error text-on-error py-3 rounded-xl font-label-button">Logout</button>
            </form>
          </div>
        ) : (
          <AccountForm handleAuth={handleAuth} />
        )}
      </div>
    </div>
  );
}
