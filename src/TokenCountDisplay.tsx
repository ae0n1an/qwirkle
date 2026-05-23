type TokenCountDisplayProps = {
  tokenCount: number;
}

function TokenCountDisplay({ tokenCount }: TokenCountDisplayProps) {
  return (
    <div className="sidebar-token-count">
      <span className="sidebar-token-label">Tokens left</span>
      <span className="sidebar-token-number">{tokenCount}</span>
    </div>
  );
}

export default TokenCountDisplay;
