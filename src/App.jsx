import { useState } from "react";
import "./App.css";

function App() {
  // Sample initial data — you can add more entries here or build a form later
  const [data, setData] = useState([
    {
      client: "Acme Inc.",
      partner: "John",
      annualAmount: 120000,
      portfolioCustomer: "Enterprise",
      expectations: "High growth",
      product: true,
      supportIssues: false,
      relationship: "Good",
      other: "",
      outOfBusiness: false,
      historicBooked2025: 100000,
      unknown: false,
      notChurnTransitionToBitwave: false,
      gildedFlag: false,
      period: "Q2 2025",
      reviewed: true,
      overallNotes: "API issues",
      changeRequired: true,
      changeDescription: "Upgrade plan",
      statusOfChange: "In Progress",
      accessChangedToReadOnly: false,
      accessRevokedAfter30Days: false,
      churnSurveySent: true,
      churnType: "Product", // For churn ARR by type calculation
      churnARR: 20000, // Amount churned for this client
    },
    // Add more rows here
  ]);

  // Calculations:
  const runningARRBalance = data.reduce((sum, row) => sum + row.annualAmount, 0);
  const churnARR = data.reduce((sum, row) => sum + (row.churnARR || 0), 0);
  const count = data.length;

  const quarterlyChurnRate = ((churnARR / runningARRBalance) * 100).toFixed(2);

  // For simplicity, accumulative churn rate is just the same here; you can improve with real data
  const accumulativeChurnRate = quarterlyChurnRate;

  // Churn ARR by Type
  const churnARRByType = data.reduce((acc, row) => {
    if (row.churnType) {
      acc[row.churnType] = (acc[row.churnType] || 0) + (row.churnARR || 0);
    }
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h1>📉 Churn Tracker Dashboard</h1>

      {/* Summary section */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Running ARR Balance:</strong> ${runningARRBalance.toLocaleString()}</p>
        <p><strong>Churn ARR:</strong> ${churnARR.toLocaleString()}</p>
        <p><strong>Count:</strong> {count}</p>
        <p><strong>Quarterly Churn Rate:</strong> {quarterlyChurnRate}%</p>
        <p><strong>Accumulative Churn Rate:</strong> {accumulativeChurnRate}%</p>
        <div>
          <strong>Churn ARR by Type:</strong>
          <ul>
            {Object.entries(churnARRByType).map(([type, amount]) => (
              <li key={type}>{type}: ${amount.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Data table */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Client</th>
            <th>Partner</th>
            <th>Annual Amount</th>
            <th>Portfolio Customer</th>
            <th>Expectations</th>
            <th>Product</th>
            <th>Support Issues</th>
            <th>Relationship</th>
            <th>Other</th>
            <th>Out of Business / Not Holding Crypto / Too Low Activity / Funding Issues</th>
            <th>Historic Just Booked in 2025</th>
            <th>Unknown</th>
            <th>Not Churn Transition to Bitwave</th>
            <th>Gilded Flag</th>
            <th>Period</th>
            <th>Reviewed</th>
            <th>Overall Notes</th>
            <th>Change Required - Y/N</th>
            <th>Change Description</th>
            <th>Status of Change</th>
            <th>Access Changed to Read Only</th>
            <th>Access Revoked after 30 Days</th>
            <th>Churn Survey Sent</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.client}</td>
              <td>{row.partner}</td>
              <td>${row.annualAmount.toLocaleString()}</td>
              <td>{row.portfolioCustomer}</td>
              <td>{row.expectations}</td>
              <td>{row.product ? "Yes" : "No"}</td>
              <td>{row.supportIssues ? "Yes" : "No"}</td>
              <td>{row.relationship}</td>
              <td>{row.other}</td>
              <td>{row.outOfBusiness ? "Yes" : "No"}</td>
              <td>${row.historicBooked2025.toLocaleString()}</td>
              <td>{row.unknown ? "Yes" : "No"}</td>
              <td>{row.notChurnTransitionToBitwave ? "Yes" : "No"}</td>
              <td>{row.gildedFlag ? "Yes" : "No"}</td>
              <td>{row.period}</td>
              <td>{row.reviewed ? "Yes" : "No"}</td>
              <td>{row.overallNotes}</td>
              <td>{row.changeRequired ? "Yes" : "No"}</td>
              <td>{row.changeDescription}</td>
              <td>{row.statusOfChange}</td>
              <td>{row.accessChangedToReadOnly ? "Yes" : "No"}</td>
              <td>{row.accessRevokedAfter30Days ? "Yes" : "No"}</td>
              <td>{row.churnSurveySent ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

