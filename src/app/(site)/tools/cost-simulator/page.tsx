import type { Metadata } from 'next';
import { CostSimulator } from '@/components/tools/CostSimulator';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'プログラミングスクール費用シミュレーター | 給付金・分割手数料込み計算',
  description: '受講料・給付金・分割払い手数料を考慮した実質費用を計算。スクール選びの参考に。',
};

export default function CostSimulatorPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: '費用シミュレーター' },
        ]}
      />

      <h1 className="mt-4 mb-2 text-xl font-black text-gray-800">
        受講費用シミュレーター
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        受講料・給付金（最大80%）・分割払い手数料を考慮した実質費用を計算できます。
      </p>

      <CostSimulator />

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
        <h2 className="mb-2 font-bold text-gray-800">給付金について</h2>
        <p>
          厚生労働省の「専門実践教育訓練給付金」を利用すると、受講費用の最大70%（上限56万円/年）が支給されます。
          雇用保険加入期間が3年以上（初回は2年以上）の方が対象です。詳細はハローワークへご確認ください。
        </p>
      </section>
    </>
  );
}
