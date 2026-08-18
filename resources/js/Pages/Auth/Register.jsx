import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { COUNTRIES } from '@/constants/countries';
import { ShieldCheck, User, Mail, Lock, Phone, Calendar, MapPin, Building } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        date_of_birth: '',
        street_address: '',
        city: '',
        country: 'United Kingdom',
        postcode: '',
        company_name: '',
        terms: false,
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
                <p className="text-xs text-slate-400 mt-1">Start sourcing directly from verified tier-1 global factories</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                
                {/* 1. Name & Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <InputLabel htmlFor="name" value="First Name" className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                            autoComplete="given-name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1 text-xs text-rose-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="surname" value="Surname / Last Name" className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="surname"
                            name="surname"
                            value={data.surname}
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                            autoComplete="family-name"
                            onChange={(e) => setData('surname', e.target.value)}
                            required
                        />
                        <InputError message={errors.surname} className="mt-1 text-xs text-rose-400" />
                    </div>
                </div>

                {/* 2. Email */}
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
                    <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                </div>

                {/* 3. Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <InputError message={errors.password} className="mt-1 text-xs text-rose-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-1 text-xs text-rose-400" />
                    </div>
                </div>

                {/* 4. Phone & Date of Birth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            placeholder="+44 20 7946 0991"
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                            autoComplete="tel"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-1 text-xs text-rose-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="date_of_birth" value="Date of Birth" className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="date_of_birth"
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm [color-scheme:dark]"
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            required
                        />
                        <InputError message={errors.date_of_birth} className="mt-1 text-xs text-rose-400" />
                    </div>
                </div>

                {/* 5. Address (4 Distinct Sections) */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 pb-1 border-b border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>Corporate / Billing Address</span>
                    </div>

                    {/* Section 1: Street Address */}
                    <div>
                        <InputLabel htmlFor="street_address" value="1. Street, house number, apartment..." className="text-slate-300 text-xs font-semibold" />
                        <TextInput
                            id="street_address"
                            type="text"
                            name="street_address"
                            value={data.street_address}
                            placeholder="e.g. 126 East Ferry Road, Dept 6898"
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                            autoComplete="street-address"
                            onChange={(e) => setData('street_address', e.target.value)}
                            required
                        />
                        <InputError message={errors.street_address} className="mt-1 text-xs text-rose-400" />
                    </div>

                    {/* Section 2 & 4: City and Post Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <InputLabel htmlFor="city" value="2. City" className="text-slate-300 text-xs font-semibold" />
                            <TextInput
                                id="city"
                                type="text"
                                name="city"
                                value={data.city}
                                placeholder="e.g. London"
                                className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                                autoComplete="address-level2"
                                onChange={(e) => setData('city', e.target.value)}
                                required
                            />
                            <InputError message={errors.city} className="mt-1 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="postcode" value="4. Post Code / ZIP" className="text-slate-300 text-xs font-semibold" />
                            <TextInput
                                id="postcode"
                                type="text"
                                name="postcode"
                                value={data.postcode}
                                placeholder="e.g. E14 9FP"
                                className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm"
                                autoComplete="postal-code"
                                onChange={(e) => setData('postcode', e.target.value)}
                                required
                            />
                            <InputError message={errors.postcode} className="mt-1 text-xs text-rose-400" />
                        </div>
                    </div>

                    {/* Section 3: Country (World countries dropdown, excluding restricted) */}
                    <div>
                        <InputLabel htmlFor="country" value="3. Country" className="text-slate-300 text-xs font-semibold" />
                        <select
                            id="country"
                            name="country"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            className="mt-1 block w-full bg-slate-950/80 border-slate-700 text-white rounded-xl text-sm py-2.5 px-3 focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            {COUNTRIES.map((c) => (
                                <option key={c} value={c} className="bg-slate-900 text-white">
                                    {c}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.country} className="mt-1 text-xs text-rose-400" />
                    </div>
                </div>

                {/* 6. Company / Brand Name (Optional) */}
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
                    <InputError message={errors.company_name} className="mt-1 text-xs text-rose-400" />
                </div>

                {/* 7. Terms & Conditions and Privacy Policy Checkbox */}
                <div className="pt-2">
                    <label className="flex items-start cursor-pointer select-none">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="bg-slate-950 border-slate-700 text-blue-600 rounded mt-0.5"
                            required
                        />
                        <span className="ms-2.5 text-xs text-slate-300 leading-relaxed">
                            I agree to the{' '}
                            <Link
                                href={route('terms')}
                                target="_blank"
                                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
                            >
                                Terms &amp; Conditions
                            </Link>
                            {' '}and{' '}
                            <Link
                                href={route('privacy')}
                                target="_blank"
                                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
                            >
                                Privacy Policy
                            </Link>.
                        </span>
                    </label>
                    <InputError message={errors.terms} className="mt-1.5 text-xs text-rose-400" />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-500/25" 
                        disabled={processing}
                    >
                        {processing ? 'Creating Corporate Account...' : 'Register & Launch Sourcing'}
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


