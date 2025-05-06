const ProjectDocument = () => {
  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Your funds are secure with us</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg bg-[var(--color-secondary-bg)] flex items-center justify-between
        "
        >
          <div>
            <p className="font-semibold text-xl">Proof of reserves</p>
            <p>1:1 reserve all users funds on our platform</p>
          </div>
          <div>
            <img src="/images/vault.svg" alt="" className="max-h-36 rounded-lg" />
          </div>
        </div>
        <div
          className="p-4 rounded-lg bg-[var(--color-secondary-bg)] flex items-center justify-between
        "
        >
          <div>
            <p className="font-semibold text-xl">$400 million Protection Fund</p>
            <p>Your security, our priority</p>
          </div>
          <div>
            <img src="/images/security.svg" alt="" className="max-h-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocument;
