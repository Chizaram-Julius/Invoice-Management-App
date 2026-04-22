import emptyImg from "../assets/illustration-empty.png";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      
      <img
        src={emptyImg}
        alt="No invoices"
        className="mb-8 w-48 md:w-64"
      />

      <h2 className="text-xl font-bold dark:text-white">
        There is nothing here
      </h2>

      <p className="mt-3 text-sm text-muted dark:text-mutedDark">
        Create an invoice by clicking the New Invoice button and get started
      </p>
    </div>
  );
}