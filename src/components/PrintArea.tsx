import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import InsertCard from './InsertCard';

interface PrintAreaProps {
  inserts: Insert[];
  preferences: UserPreferences;
}

export default function PrintArea({ inserts, preferences }: PrintAreaProps) {
  return (
    <>
      {/* Print layout: A4, multiple cards per page */}
      <div id="print-area" className="print-only">
        <div
          style={{
            width: '210mm',
            minHeight: '297mm',
            display: 'flex',
            flexWrap: 'wrap',
            background: '#fff',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {inserts
            .filter((insert) => insert.selected)
            .map((insert, i) => (
              <InsertCard insert={insert} key={insert.id} index={i} preferences={preferences} />
            ))}
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        .print-only {
          display: none;
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .screen-only {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body, html, #root {
            width: 210mm !important;
            min-height: 297mm !important;
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #print-area {
            display: block !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 5mm 0 0 5mm !important;
            box-sizing: border-box !important;
          }
          #print-area > div {
            display: flex !important;
            flex-wrap: wrap !important;
            width: 205mm !important;
            min-height: 292mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }
        }
      `}</style>
    </>
  );
}
