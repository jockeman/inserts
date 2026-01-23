
import { useState } from 'react';
import InsertCard from './components/InsertCard';
import ImageInput from './components/ImageInput';
import './App.css';

interface Insert {
  name: string;
  image: string;
  class: string;
  ac: string;
  hp: string;
  pp: string;
  pi: string;
}

const emptyInsert: Insert = {
  name: '',
  image: '',
  class: '',
  ac: '',
  hp: '',
  pp: '',
  pi: '',
};

function App() {
  const [inserts, setInserts] = useState<Insert[]>([]);

  function addEmptyCard() {
    setInserts(arr => [...arr, { ...emptyInsert }]);
  }

  function updateInsert(idx: number, field: keyof Insert, value: string) {
    setInserts(arr => arr.map((insert, i) => 
      i === idx ? { ...insert, [field]: value } : insert
    ));
  }

  function removeInsert(idx: number) {
    setInserts(arr => arr.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <h1 className="screen-only">RPG Initiative Tracker Inserts</h1>
      
      <button className="screen-only" onClick={addEmptyCard} style={{ marginBottom: 24, padding: '8px 16px', fontSize: '1.1em' }}>
        + Add New Card
      </button>

      {inserts.length > 0 && (
        <div className="screen-only" style={{ marginBottom: 24 }}>
          <button onClick={() => window.print()} style={{ padding: '8px 16px', fontSize: '1.1em' }}>
            Print All Inserts
          </button>
        </div>
      )}

      <div className="cards-editor screen-only" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {inserts.map((insert, i) => (
          <div key={i} className="card-editor" style={{ 
            border: '2px solid #ddd', 
            borderRadius: 8, 
            padding: 16, 
            background: '#f9f9f9',
            position: 'relative'
          }}>
            <button 
              onClick={() => removeInsert(i)} 
              style={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                background: '#f88',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: '1em'
              }}
            >
              Remove
            </button>
            
            <h3 style={{ marginTop: 0 }}>Card {i + 1}</h3>
            
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {/* Input Form */}
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label>
                      Name<br />
                      <input 
                        value={insert.name} 
                        onChange={(e) => updateInsert(i, 'name', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Class<br />
                      <select 
                        value={insert.class} 
                        onChange={(e) => updateInsert(i, 'class', e.target.value)}
                        style={{ width: '100%' }}
                      >
                        <option value="">-- Select --</option>
                        <option value="Barbarian">Barbarian</option>
                        <option value="Bard">Bard</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Druid">Druid</option>
                        <option value="Fighter">Fighter</option>
                        <option value="Monk">Monk</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Ranger">Ranger</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Sorcerer">Sorcerer</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Wizard">Wizard</option>
                      </select>
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label>
                        AC<br />
                        <input 
                          value={insert.ac} 
                          onChange={(e) => updateInsert(i, 'ac', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </label>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>
                        Max HP<br />
                        <input 
                          value={insert.hp} 
                          onChange={(e) => updateInsert(i, 'hp', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label>
                        Passive Perception<br />
                        <input 
                          value={insert.pp} 
                          onChange={(e) => updateInsert(i, 'pp', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </label>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>
                        Passive Insight<br />
                        <input 
                          value={insert.pi} 
                          onChange={(e) => updateInsert(i, 'pi', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>
                      Image<br />
                      <ImageInput 
                        value={insert.image} 
                        onChange={(val) => updateInsert(i, 'image', val)} 
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Live Preview */}
              <div style={{ flex: '0 0 auto' }}>
                <h4 style={{ marginTop: 0, marginBottom: 8 }}>Preview</h4>
                <InsertCard insert={insert} index={i} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print layout: A4, multiple cards per page */}
      <div id="print-area" className="print-only">
        <div style={{
          width: '210mm', minHeight: '297mm',
          display: 'flex', flexWrap: 'wrap',
          background: '#fff', margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          {inserts.map((insert, i) => (
            <InsertCard insert={insert} key={i} index={i} />
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
    </div>
  );
}

export default App;
