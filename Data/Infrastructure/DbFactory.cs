namespace Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private SampleCodeFirstDbContext dbContext;

        public SampleCodeFirstDbContext Init()
        {
            return dbContext ?? (dbContext = new SampleCodeFirstDbContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}