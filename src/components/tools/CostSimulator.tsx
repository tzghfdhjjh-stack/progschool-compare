'use client';

import { useState } from 'react';

interface SimulatorResult {
  totalCost: number;
  installmentTotal: number;
  installmentFee: number;
  monthlyPayment: number;
  subsidyAmount: number;
  netCost: number;
}

export function CostSimulator() {
  const [basePrice, setBasePrice] = useState(580000);
  const [hasInstallment, setHasInstallment] = useState(false);
  const [months, setMonths] = useState(24);
  const [feeRate, setFeeRate] = useState(0.12);
  const [subsidyRate, setSubsidyRate] = useState(0);

  const result: SimulatorResult = (() => {
    const subsidyAmount = Math.floor(basePrice * subsidyRate);
    const afterSubsidy = basePrice - subsidyAmount;
    const installmentFee = hasInstallment ? Math.floor(afterSubsidy * feeRate) : 0;
    const installmentTotal = afterSubsidy + installmentFee;
    const monthlyPayment = hasInstallment ? Math.ceil(installmentTotal / months) : 0;
    return {
      totalCost: basePrice,
      installmentTotal,
      installmentFee,
      monthlyPayment,
      subsidyAmount,
      netCost: installmentTotal,
    };
  })();

  const fmt = (n: number) => `¥${n.toLocaleString('ja-JP')}`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-gray-800">受講費用シミュレーター</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            受講料（税込）
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={100000}
              max={1000000}
              step={10000}
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-28 text-right font-bold text-gray-800">{fmt(basePrice)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="installment"
            checked={hasInstallment}
            onChange={(e) => setHasInstallment(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="installment" className="text-sm font-medium text-gray-700">
            分割払いを利用する
          </label>
        </div>

        {hasInstallment && (
          <div className="ml-6 space-y-3 rounded-lg bg-gray-50 p-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600">分割回数</label>
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {[6, 12, 18, 24, 36, 48, 60].map((m) => (
                  <option key={m} value={m}>{m}回払い</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                手数料率: {(feeRate * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min={0}
                max={0.20}
                step={0.01}
                value={feeRate}
                onChange={(e) => setFeeRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            給付金・補助金（{(subsidyRate * 100).toFixed(0)}%）
          </label>
          <input
            type="range"
            min={0}
            max={0.80}
            step={0.10}
            value={subsidyRate}
            onChange={(e) => setSubsidyRate(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-1 text-xs text-gray-500">
            ※ 厚生労働省「専門実践教育訓練給付金」は最大80%
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2 rounded-xl bg-blue-50 p-4">
        <h3 className="font-bold text-blue-800">シミュレーション結果</h3>
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>受講料</span>
            <span className="font-medium">{fmt(result.totalCost)}</span>
          </div>
          {result.subsidyAmount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>給付金・補助</span>
              <span className="font-medium">- {fmt(result.subsidyAmount)}</span>
            </div>
          )}
          {hasInstallment && (
            <div className="flex justify-between text-red-600">
              <span>分割手数料</span>
              <span className="font-medium">+ {fmt(result.installmentFee)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-blue-200 pt-2 text-base font-bold text-blue-800">
            <span>実質総額</span>
            <span>{fmt(result.netCost)}</span>
          </div>
          {hasInstallment && (
            <div className="flex justify-between text-gray-600">
              <span>月々の支払い（約）</span>
              <span className="font-medium">{fmt(result.monthlyPayment)} / 月</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
