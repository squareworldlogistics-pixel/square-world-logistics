"use client";

import { useState, useEffect, useRef } from "react";

function AutocompleteInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  suggestions,
  required = false,
  loading = false
}: { 
  label: string; 
  placeholder: string; 
  value: string; 
  onChange: (val: string) => void; 
  suggestions: string[];
  required?: boolean;
  loading?: boolean;
}) {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim().length > 1) { // Show after 2 characters
      const matches = suggestions.filter(s => 
        s.toLowerCase().startsWith(value.toLowerCase()) && 
        s.toLowerCase() !== value.toLowerCase()
      );
      setFiltered(matches.slice(0, 8));
      setShow(matches.length > 0);
    } else {
      setShow(false);
    }
  }, [value, suggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <label className="swl-label">{label} {loading && <span style={{ opacity: 0.5, fontSize: "0.6rem" }}>(Loading...)</span>}</label>
      <input 
        required={required}
        type="text" 
        className="swl-input" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.trim().length > 1 && filtered.length > 0 && setShow(true)}
      />
      {show && (
        <div 
          style={{ 
            position: "absolute", 
            top: "100%", 
            left: 0, 
            right: 0, 
            backgroundColor: "var(--color-swl-white)", 
            border: "1px solid var(--color-swl-rule)",
            borderTop: "none",
            zIndex: 100,
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            animation: "swl-fade-in 0.2s ease",
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          {filtered.map((s, i) => (
            <div 
              key={i} 
              onClick={() => {
                onChange(s);
                setShow(false);
              }}
              style={{ 
                padding: "0.75rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--color-swl-mist)" : "none",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-swl-mist)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuoteGenerator() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: ""
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState({ countries: true, cities: true });

  useEffect(() => {
    // Fetch All Countries
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then(res => res.json())
      .then(data => {
        const names = data.map((c: any) => c.name.common).sort();
        setCountries(names);
        setLoading(prev => ({ ...prev, countries: false }));
      })
      .catch(() => setLoading(prev => ({ ...prev, countries: false })));

    // Fetch Indian Cities
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setCities(data.data.sort());
        }
        setLoading(prev => ({ ...prev, cities: false }));
      })
      .catch(() => setLoading(prev => ({ ...prev, cities: false })));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `I would like a quote for a shipment from ${formData.origin} to ${formData.destination}. Weight: ${formData.weight}, Dimensions: ${formData.dimensions}`;
    window.location.href = `/contact?message=${encodeURIComponent(message)}`;
  };

  return (
    <div 
      style={{ 
        backgroundColor: "var(--color-swl-mist)", 
        padding: "2.5rem", 
        border: "1px solid var(--color-swl-rule)",
        borderRadius: "2px"
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h3 
          style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "1.5rem", 
            marginBottom: "0.5rem",
            color: "var(--color-swl-charcoal)" 
          }}
        >
          Quick Quote
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--color-swl-slate)" }}>
          Get a personalized logistics estimate in minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <AutocompleteInput 
            label="Origin City (India)"
            placeholder="e.g. Mumbai"
            value={formData.origin}
            onChange={(val) => setFormData({...formData, origin: val})}
            suggestions={cities}
            required
            loading={loading.cities}
          />
          <AutocompleteInput 
            label="Destination Country"
            placeholder="e.g. United Kingdom"
            value={formData.destination}
            onChange={(val) => setFormData({...formData, destination: val})}
            suggestions={countries}
            required
            loading={loading.countries}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label className="swl-label">Weight (kg)</label>
            <input 
              required
              type="text" 
              className="swl-input" 
              placeholder="e.g. 250kg"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
          </div>
          <div>
            <label className="swl-label">Dimensions (LxWxH)</label>
            <input 
              type="text" 
              className="swl-input" 
              placeholder="e.g. 120x80x100 cm"
              value={formData.dimensions}
              onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="swl-btn swl-btn--primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
          Request Estimate
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </div>
  );
}
