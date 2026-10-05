# PREDICTIVE FLIGHT DISRUPTION ENGINE
### From Reactive Delay Management to Proactive Disruption Recovery

> **Aviation Operations Intelligence System built for National-Level Hackathon**  
> *"Predict disruptions. Protect connections. Recover passengers before delays cascade."*

---

> [!NOTE]  
> **DEMONSTRATION / SYNTHETIC DATA NOTICE:**  
> This prototype uses synthetic demonstration data across Indian commercial air corridors and is not connected to live airline operational systems. All passenger names, PNRs, and flights are generated for evaluation and simulation purposes.

---

## 1. Problem Statement

Commercial aviation operations currently manage flight delays **reactively**. When an inbound aircraft arrives 90 minutes late:
1. Operations control reacts only after off-block delays occur.
2. Downstream aircraft rotations suffer unbuffered turnaround compression.
3. Connecting passengers arrive at hub airports with shattered minimum connection time (MCT) buffers.
4. Gate agents and ground staff face chaotic terminal queues to manually rebook stranded passengers.
5. Incurred costs skyrocket due to emergency hotel vouchers, lost baggage, passenger compensation, and severe network disruption.

---

## 2. Solution: The AeroCascade Architecture

The **Predictive Flight Disruption Engine** changes this paradigm by introducing:
1. **Explainable ML Delay Prediction:** Detects high-probability delays hours before flight departure by evaluating weather squall severity, rotational turnaround deficits, and hub congestion.
2. **Network Cascade Blast Radius Modeling:** Traces how one flight's delay cascades into:
   - Aircraft next assignments (e.g. Tail `VT-EXQ` flying `AI203` BOM → DEL scheduled next on `AI417` DEL → BLR).
   - Inbound connecting passenger banks (e.g. 42 connecting passengers at DEL, 18 of whom face negative connection slack).
   - Downstream route corridors.
3. **Automated Batch Passenger Recovery Engine:** Multi-criteria optimization scoring that searches partner carrier seat inventories (IndiGo, Akasa Air, Air India) and rebooks at-risk passengers *before* they miss connections.
4. **Before vs. After Impact Reduction:** Proves quantitative operational improvement (e.g., missed connections cut from 18 → 4, network disruption index reduced by 60%).

---

## 3. Technology Stack

- **Frontend & Web Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Aesthetics:** Tailwind CSS with Aviation Operations Dark Theme (`#050b14` background, cyan, rose, amber, and emerald status accents)
- **Data Visualizations:** Recharts (24-hour Disruption Velocity Area Charts, Severity Distribution Donut Charts, Before/After Comparison Bar Charts)
- **Icons & Components:** Lucide React
- **Backend & APIs:** Next.js Route Handlers (`/api/*`)
- **Database & ORM:** SQLite with Prisma ORM (relational schema with referential integrity)
- **Machine Learning Engine:**
  - Python (`ml/train_and_predict.py` with scikit-learn GradientBoosting)
  - Embedded TypeScript ML Inference Engine (`lib/ml-prediction.ts`) with explainable SHAP-style attribution

---

## 4. Key Application Modules

| Module | Route | Functionality |
|---|---|---|
| **Landing Gateway** | `/` | Operational control entry point with core architectural pillar highlights |
| **Executive Dashboard** | `/dashboard` | Integrated Operations Control (IOC) telemetry, 8 real-time KPI counters, active incident cards, 24h trend lines, and recent recovery actions feed |
| **Booking Delay Predictor** | `/booking-check` | Real-time weather and 2026 historical pattern engine evaluating delay probability for user-selected booking candidates |
| **Disruption Engine** | `/disruptions` | Active & predicted disruptions catalog with risk severity filters (CRITICAL, HIGH, MEDIUM, LOW) and ML risk attribution chips |
| **Cascade Visualizer** | `/cascade` | Hierarchical visual cascade graph tracing disruption shock, aircraft rotation, connecting pax, at-risk pax, and alternative flights |
| **Passenger Manifest** | `/passengers` | Filterable passenger impact list with loyalty tiers, connection slack timers, and 1-click individual rebooking modal |
| **Smart Rebooking** | `/recovery` | Automated batch recovery plan console with Before vs. After metrics banner and 1-click "Approve All" action |
| **What-If Simulator** | `/simulator` | Tactical scenario builder (Delay, Cancellation, Weather, Congestion) with real-time before/after side-by-side comparison |
| **Airspace Network** | `/network` | Interactive SVG Hub-and-Spoke airspace topology across 10 Indian hubs with glowing disruption arcs and airport drawers |
| **Fleet Registry** | `/flights` | Commercial flight schedule manifest, aircraft registrations, seat loads, and turnaround links |
| **System Event Log** | `/activity` | Immutable chronological operational audit trail of automated predictions, detections, and rebooking approvals |

---

## 5. Disruption Cascade Score Formula

The **Disruption Cascade Score** ($0 \text{ to } 100$) quantifies the multi-tier shock of an operational disruption:

$$\text{Cascade Score} = 0.30 \cdot S_{\text{delay}} + 0.35 \cdot S_{\text{connections}} + 0.20 \cdot S_{\text{rotation}} + 0.15 \cdot S_{\text{congestion}}$$

- $S_{\text{delay}}$: Scaled primary delay magnitude
- $S_{\text{connections}}$: Ratio and volume of passengers with connection buffer $< 45\text{m}$ MCT
- $S_{\text{rotation}}$: Penalty for downstream scheduled leg of the same aircraft
- $S_{\text{congestion}}$: Hub airport runway and airspace congestion index

---

## 6. Multi-Criteria Rebooking Optimization

Alternative flights are scored ($0 \text{ to } 100$) using:
1. **Seat Availability (30 pts):** Confirmed open seats vs. waitlist
2. **Arrival Time Proximity (30 pts):** Proximity to original scheduled arrival
3. **Connection Feasibility (25 pts):** Buffer exceeding Minimum Connection Time ($MCT = 45\text{ min}$)
4. **Passenger Loyalty Tier (15 pts):** Platinum and Gold priority weighting

---

## 7. Database Schema

The database schema (`prisma/schema.prisma`) includes:
- `Airport`: Hub codes (`DEL`, `BOM`, `BLR`, `HYD`, `MAA`, `CCU`, `PNQ`, `GOI`, `AMD`, `COK`), coordinates, runways, congestion score, weather status
- `Aircraft`: Fleet registrations (`VT-EXQ`, `VT-IFG`, `VT-YAA`, etc.), models, capacities
- `Flight`: Flight numbers (`AI203`, `AI417`, `AI805`, `6E204`, etc.), airlines, scheduled vs estimated times, risk levels
- `Passenger`: PNRs, names, loyalty tiers (`PLATINUM`, `GOLD`, `SILVER`, `REGULAR`), recovery status
- `Booking`: Seat numbers, cabin classes, connecting flags
- `Connection`: Inbound and outbound flight legs, transfer hubs, scheduled vs actual buffers
- `Disruption`: Flight relations, cascade scores, primary risk factor JSON
- `RecoveryOption`: Candidate alternative flights, optimization scores, rationales
- `RecoveryAction`: Immutable audit log of rebooking executions
- `SystemLog`: Chronological operations log

---

## 8. API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Aggregated executive KPIs, active disruptions, 24h trend data, airport congestion |
| `GET` | `/api/flights` | Flight schedule directory with search and status filters |
| `GET` | `/api/disruptions` | Active and predicted disruptions with risk badges and explainable weights |
| `POST` | `/api/disruptions` | Injects/triggers a new disruption scenario on a flight |
| `GET` | `/api/cascade/[flightId]` | Complete cascade tree, rotation propagation, and downstream connection slacks |
| `GET` | `/api/passengers` | Passenger manifests with connection risk filters |
| `POST` | `/api/predict` | ML delay duration, probability, and explainable risk factors |
| `POST` | `/api/simulate` | What-if simulation returning side-by-side Before vs After metrics |
| `GET` | `/api/recovery-options/[paxId]` | Scored and ranked alternative flight options for a single passenger |
| `POST` | `/api/recovery-plan` | Batch automated recovery plan calculation for a disrupted flight |
| `POST` | `/api/recovery-plan/approve` | Approves batch or individual passenger rebookings |
| `POST` | `/api/rebook` | Rebooks a single passenger to a specific alternative flight |
| `GET` | `/api/activity` | Timestamped operational audit log feed |
| `POST` | `/api/demo/run` | Executes the 10-step hackathon benchmark presentation flow |
| `POST` | `/api/seed` | Resets the system state to pristine initial demonstration data |

---

## 9. Quickstart: Installation & Execution

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### One-Command Setup & Launch
```bash
# 1. Install dependencies
npm install

# 2. Push database schema & populate demonstration seed data
npm run prisma:push
npm run prisma:seed

# 3. Run automated test suite
npm test

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 10. The 2-to-4 Minute Hackathon Presentation Flow

To present to judges:

1. **Step 1:** Open [http://localhost:3000](http://localhost:3000) and click **"ENTER OPERATIONS CENTER"**. Show normal network telemetry.
2. **Step 2:** Click **"Presentation Demo"** in the top navigation bar or go to `/disruptions`.
3. **Step 3:** Select flight **`AI203`** (Mumbai → Delhi) with predicted **90-minute delay**.
4. **Step 4:** System automatically displays:
   - **137** passengers affected
   - **42** connection risks
   - **18** passengers at critical risk
5. **Step 5:** Navigate to **`/cascade`**. Show the visual cascade graph:
   $$\text{AI203 Delay (+90m)} \rightarrow \text{VT-EXQ Rotation (AI417 +75m)} \rightarrow 42 \text{ Connecting Pax} \rightarrow 18 \text{ At Risk} \rightarrow 3 \text{ Alternative Flights}$$
6. **Step 6:** Click **"GENERATE AI RECOVERY PLAN"** to open `/recovery`.
7. **Step 7:** Explain multi-criteria scoring algorithm (seats, arrival proximity, MCT buffer).
8. **Step 8:** Click **"Approve All Rebookings"**.
9. **Step 9:** Observe the Before vs. After comparison banner:
   - Missed connections: **18 → 4 (-77.8%)**
   - Disruption Cascade Score: **78/100 → 31/100 (-60%)**
   - Passengers recovered: **36 protected**
10. **Step 10:** Open **`/activity`** to show the cryptographic audit timeline.

---

## 11. Limitations & Future Scope

- **Interline PSS Integration:** In production, would connect directly via IATA NDC (New Distribution Capability) and Amadeus/Sabre APIs for automated ticket re-issuance.
- **Dynamic Crew Scheduling:** Future extensions can model real-time Flight Duty Period Limitations (DGCA CAR Section 7 Series J) and deadhead crew positioning.
- **Baggage Tracking:** Proactive integration with RFID baggage sortation systems at transfer hubs.
