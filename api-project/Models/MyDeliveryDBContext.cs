using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class MyDeliveryDBContext : DbContext
    {
        public MyDeliveryDBContext()
        {
        }

        public MyDeliveryDBContext(DbContextOptions<MyDeliveryDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
        public virtual DbSet<DeliveryItem> DeliveryItems { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Delivery>(entity =>
            {
                entity.HasIndex(e => e.CustomerId, "IX_Deliveries_CustomerId");

                entity.HasIndex(e => e.StatusId, "IX_Deliveries_StatusId");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.CustomerId);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.StatusId);
            });

            modelBuilder.Entity<DeliveryItem>(entity =>
            {
                entity.HasIndex(e => e.DeliveryId, "IX_DeliveryItems_DeliveryId");

                entity.HasIndex(e => e.ProductId, "IX_DeliveryItems_ProductId");

                entity.HasOne(d => d.Delivery)
                    .WithMany(p => p.DeliveryItems)
                    .HasForeignKey(d => d.DeliveryId);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.DeliveryItems)
                    .HasForeignKey(d => d.ProductId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
