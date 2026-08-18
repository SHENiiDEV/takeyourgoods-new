import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        company_name: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Corporate Account - TakeYourGoods AI" />

            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-white">Create B2B Account</h1>
                <p className="text-xs text-slate-400 mt-1">Start sourcing directly from verified tier-1 factories</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="text-slate-300 text-xs font-semibold" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Business Email" className="text-slate-300 text-xs font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel htmlFor="company_name" value="Company / Brand Name (Optional)" className="text-slate-300 text-xs font-semibold" />

                    <TextInput
                        id="company_name"
                        type="text"
                        name="company_name"
                        value={data.company_name}
                        placeholder="e.g. Acme Sourcing Ltd"
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        onChange={(e) => setData('company_name', e.target.value)}
                    />

                    <InputError message={errors.company_name} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-slate-300 text-xs font-semibold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-slate-300 text-xs font-semibold"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-rose-400"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-500/25" 
                        disabled={processing}
                    >
                        {processing ? 'Creating Account...' : 'Register & Launch Sourcing'}
                    </PrimaryButton>
                </div>

                <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-blue-400 hover:text-blue-300 font-semibold">
                        Sign In &rarr;
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

