import { useEffect, useState } from 'react'
import './App.css'
import { createChecklist, getChecklistByDate } from './middleware/Checklist';
import { createScanner, deleteScanner, getScannersByChecklist, updateScanner } from './middleware/Scanner';

type ScannerType = {
    _id?: string;
    scannerId: string;
    tempName: string;
    checkedOut: boolean;
    checklist: string;
};

type ChecklistType = {
    _id?: string;
    date: string;
};

function App() {
  const [numberOfScanners, setNumberOfScanners] = useState(0);
  const [scanners, setScanners] = useState<Array<ScannerType>>([]);
  const [checklist, setChecklist] = useState<ChecklistType | null>(null);
  const [checklistDate, setChecklistDate] = useState<Date>(new Date());

  useEffect(() => {
    const handleNumberOfScanners = () => {
      setNumberOfScanners(scanners.length);
    }; handleNumberOfScanners()
  }, [scanners]);

  useEffect(() => {
    const handleChecklist = async () => {
    try {
      const protoChecklist = await getChecklistByDate((checklistDate).toISOString());
      setChecklist(protoChecklist)
    } catch(err) {
      const newChecklist = await createChecklist({
        _id : "",
        date : (checklistDate).toISOString()
      });

      setChecklist(newChecklist);

      return err;
    }
  }; handleChecklist();
  }, [checklistDate])

  useEffect(() => {
    const handleScanners = async () => {
      if (checklist == null) return;

      const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

      setScanners(protoScanners);
    }; handleScanners();
  }, [checklist])

  async function AddScanner() {
    const newScanner = await createScanner({
      _id : "",
      tempName : "",
      scannerId : "",
      checkedOut : false,
      checklist : checklist?._id ? checklist._id : "" 
    });

    console.log(newScanner);

    if (checklist == null) return;

    const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

    setScanners(protoScanners);
  }

  async function DeleteScanner(index : number) {
    const scanner = scanners[index];

    const deletedScanner = await deleteScanner(scanner._id ? scanner._id : "");

    console.log(deletedScanner);

    if (checklist == null) return;

    const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

    setScanners(protoScanners);
  }

  async function CheckOutScanner(index : number) {
    const checkedOutScanner = await updateScanner(scanners[index]._id ? scanners[index]._id : "", {checkedOut : !(scanners[index].checkedOut)});

    console.log(checkedOutScanner);

    if (checklist == null) return;

    const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

    setScanners(protoScanners);
  }

  async function setScannerId(index : number, scannerId : string) {
    const thisScanner = await updateScanner(scanners[index]._id ? scanners[index]._id : "", {scannerId : scannerId});

    console.log(thisScanner);

    if (checklist == null) return;

    const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

    setScanners(protoScanners);
  }

  async function setTempName(index : number, tempName : string) {
     const thisScanner = await updateScanner(scanners[index]._id ? scanners[index]._id : "", {tempName : tempName});

    console.log(thisScanner);

    if (checklist == null) return;

    const protoScanners = await getScannersByChecklist(checklist._id ? checklist._id : "");

    setScanners(protoScanners);
  }

  return (
    <>
      <nav>
        <h1>Scanner Check In/Out System</h1>
        <img src="https://www.nasirgriffin.com/static/Nasir_Griffin.png" />
        <span></span>
      </nav>

      <main>
        <p className='Directions'>Press "Add Scanner" To Begin</p>
        <p className='Credits'>Application Written By Nasir Griffin</p>

        <section className="Scannerheader" id="center">
          <p className='NumberOfScanners'>{numberOfScanners}</p>
          <label className='ChecklistDateLabel' htmlFor='ChecklistDate'>Enter The Date of the Checklist</label>
          <input
          className='ChecklistDate'
          name='ChecklistDate'
              type="date"
              onChange={(e) => {
                  setChecklistDate(new Date(e.target.value));
              }}
          />
        </section>

        <div className='Scanners'>
          {
            scanners.map((scanner : ScannerType, index : number) => (
              <div className='Scanner'>
                <input key={scanner._id} defaultValue={scanner.scannerId} placeholder="last four of id" name='identifier' onBlur={(e) => {setScannerId(index, e.target.value)}}/>
                <input key={scanner._id} defaultValue={scanner.tempName} placeholder="Temp Name" name='tempName' onBlur={(e) => {setTempName(index, e.target.value)}}/>
                <p>{scanner.scannerId ? scanner.scannerId.length > 0 ? scanner.scannerId : "No ID" : "No ID"}</p>
                <p>{scanner.tempName ? scanner.tempName.length > 0 ? scanner.tempName : "No Name" : "No Name"}</p>
                <p>{scanner.checkedOut ? "Checked Out" : "Checked In"}</p>
                <div className='Operations'>
                  <button onClick={() => {CheckOutScanner(index)}}>{scanner.checkedOut ? "Check In" : "Check Out"}</button>
                  <button onClick={() => {DeleteScanner(index)}}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>

        <button className="AddScanner" onClick={() => {AddScanner()}}>Add Scanner</button>

      </main>

      <div className="ticks"></div>
      <section id="spacer"></section>

      <p className='Copyright'>© 2026 Griffin Managed Web Solutions. All rights reserved.</p>
    </>
  )
}

export default App
