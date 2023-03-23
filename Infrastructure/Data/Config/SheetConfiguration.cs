using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class SheetConfiguration : IEntityTypeConfiguration<CharacterSheet>
    {
        public void Configure(EntityTypeBuilder<CharacterSheet> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.CharName).HasMaxLength(30);
            builder.Property(p => p.PlayerName).HasMaxLength(30);
            builder.HasOne(s => s.Skills).WithMany().HasForeignKey(p => p.SkillsId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(s => s.AbilityScores).WithMany().HasForeignKey(p => p.AbilityScoresId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(s => s.Modificators).WithMany().HasForeignKey(p => p.ModificatorsId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(s => s.CharClass).WithMany().HasForeignKey(p => p.CharClassId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(s => s.CharRace).WithMany().HasForeignKey(p => p.CharRaceId).OnDelete(DeleteBehavior.Cascade);

        }
    }

}