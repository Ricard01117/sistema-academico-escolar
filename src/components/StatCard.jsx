function StatCard({
  icono,
  numero,
  titulo,
  tipo,
  modo,
}) {
  const esInfantil = modo === "infantil";

  return (
    <div className={`stat-card ${tipo || ""}`}>
      {esInfantil && (
        <div className="stat-icon">
          {icono}
        </div>
      )}

      <div className="stat-info">
        <strong>{numero}</strong>
        <span>{titulo}</span>
      </div>
    </div>
  );
}

export default StatCard;