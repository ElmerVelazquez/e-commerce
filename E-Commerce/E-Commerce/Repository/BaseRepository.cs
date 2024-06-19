using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class BaseRepository<Entity> : IBaseRepository<Entity> where Entity : class, InterfaceId
    {
        protected readonly EcommerceDbContext _context;
        private readonly IMapper _mapper;
        private readonly DbSet<Entity> _dbSet;
        int Id { get; set; }

        public BaseRepository(EcommerceDbContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Set<Entity>();
            _mapper = mapper;

        }
        public async Task<Result<List<Entity>>> get()
        {
            var registros = await _dbSet.ToListAsync();
            if (registros == null)
            {
                return Result<List<Entity>>.Fail("registros no encontrados");
            }
            return Result<List<Entity>>.Success(registros);
        }
        public async Task<Result<Entity>> get(int id)
        {
            var registro = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Entity>.Fail("id no encontrado");
            }
            return Result<Entity>.Success(registro);
        }
        public async Task<Result<List<Entity>>> get(int lastpage, int size)
        {
            var registro = await _dbSet
              .OrderBy(t => t.Id)
              .Where(b => b.Id > lastpage)
              .Take(size)
              .ToListAsync();
            return Result<List<Entity>>.Success(registro);
        }
        public async Task<Result<Dto>> add<Dto>(Dto dto) where Dto : class 
        {
            Entity registro = _mapper.Map<Entity>(dto);
            _dbSet.Add(registro);
            await _context.SaveChangesAsync();
            return Result<Dto>.Success(dto);
        }
        public async Task<Result<Dto>> update<Dto>(Dto dto, int id) where Dto : class
        {
            var registro = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Dto>.Fail("El id no existe");
            }
            _mapper.Map(dto, registro);
            await _context.SaveChangesAsync();
            return Result<Dto>.Success(dto);
        }
        public async Task<Result<Entity>> delete(int id)
        {
            var registro = _dbSet.FirstOrDefault(x => x.Id == id);
            if (registro == null)
            {
                return Result<Entity>.Fail("El id no existe");
            }
            _dbSet.Remove(registro);
            await _context.SaveChangesAsync();
            return Result<Entity>.Success(registro);
        }
    }
}
